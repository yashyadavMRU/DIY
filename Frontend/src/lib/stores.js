import { writable, derived, get } from "svelte/store";
import { PUBLIC_API_URL_AUTH, PUBLIC_API_URL_CART } from "$env/static/public";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";

// Current page store for routing
export const currentPage = writable(null);

// Selected product for detail page
export const selectedProduct = writable(null);

const isBrowser = typeof window !== "undefined";

let storedUser = null;

if(isBrowser){
    try {
        const item = localStorage.getItem("user");
        storedUser = item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Failed to parse user from storage: ${error}`);
        storedUser = null;
    }
}

function createAuthStore(){
    const {subscribe, set, update} = writable(storedUser);

    // helper to update state and localStorage
    const save = (data) => {
        set(data);
        if(isBrowser) localStorage.setItem("user", JSON.stringify(data));
    };

    return{
        subscribe,

        // register user
        register: async(name, email, password) => {
            const res = await fetch(`${PUBLIC_API_URL_AUTH}/register` ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password})
            });

            const result = await res.json();
            
            if(!res.ok){
                throw new Error(result.message || result.error || "Registration failed");
            }

            const userData = result?.user;
            const token = result?.user?.token;

            if(userData && token){
                localStorage.setItem("token", token);
                save(userData);
                return userData;
            }else{
                throw new Error("Server responded successfully but user data was missing.");
            }
        },

        login: async(email, password) => {
            const res = await fetch(`${PUBLIC_API_URL_AUTH}/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password}),
            });

            const result = await res.json();

            if(!res.ok){
                throw new Error(result.message || result.error || "Invalid email or password");
            }

            // saving thr user details in the localStorage
            const userData = result?.user || result?.data?.user;
            const token = userData?.token || result?.token || result?.data?.token;

            if(userData && token){
                localStorage.setItem("token", token);
                save(userData);
                return userData;
            }else{
                throw new Error("Server responded successfully but user data was missing.");
            }
        },

        logout: () => {
            set(null);
            if(isBrowser) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
    };

}

export const user = createAuthStore();

function createCartStore() {
    const {subscribe, set, update} = writable([]);
    
    // helper to save to localStorage 
    const saveLocal = (items) => {
        if(isBrowser) localStorage.setItem("cart", JSON.stringify(items));
    }

    return{
        subscribe,

        // LOAD: called when app starts or user logs in
        load: async() => {
            const currentUser = get(user);

            if(currentUser){

                try {

                    const token = browser ? localStorage.getItem("token") : null;
                    const res = await fetch(`${PUBLIC_API_URL_CART}`, {
                        headers: {
                            "Content-Type": "application/json",
                        ...(token ? {Authorization : `Bearer ${token}`} : {})
                        }
                    });

                    if(res.ok){
                        const data = await res.json();
                        set(data.items || []);
                    }
                } catch (error) {
                    console.error("Failed to load cart: ", error);
                }
            }else{

                if(isBrowser){
                    const stored = localStorage.getItem("cart");
                    set(stored ? JSON.parse(stored) : []);
                }
            }
        },

        // ADD ITEM
        addItem: async(product, quantity = 1) => {
            const currentUser = get(user);

            // update the ui immediately
            update(items => {
                const existing = items.find(i => i.id === product.id);
                const newItems = existing ? items.map(i => i.id === product.id ? {...i, quantity: i.quantity + quantity}: i) : [...items, {...product, quantity}];

                // if guest, save to local storage
                if(!currentUser) saveLocal(newItems);
                return newItems;
            });

            // If user is logged in: send to backend
            if(currentUser){
                try {
                    await fetch(`${PUBLIC_API_URL_CART}/add`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json",
                            "Authorization": `Bearer ${currentUser.token}`
                        },
                        body: JSON.stringify({ productId: product.id, quantity})
                    });
                } catch (error) {
                    console.error(`Failed to sync with server: ${error}`);
                }
            }
        },

        // update Quantity
        updateQuantity: async(productId, quantity) => {
            const currentUser = get(user);

            update(items => {
                const existingItem = items.find(i => i.id === productId);
                if(!existingItem) return items;

                const newQuantity = existingItem.quantity + quantity;
                
                // If quantity becomes 0 or less, remove the item entirely
                if(newQuantity <=0){
                    const newItems = items.filter(i => i.id !== productId);
                    if(!currentUser) saveLocal(newItems);
                }

                // otherwise, update the quantity
                const newItems = items.map(i => i.id === productId ? {...i, quantity: newQuantity}: i);

                if(!currentUser) saveLocal(newItems);
                return newItems;
            });

            // Sycn with backend if logged in
            if(currentUser){
                try {
                    // POST or PATCH data to database
                    await fetch(`${PUBLIC_API_URL_CART}/update`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authoriztion": `Bearer ${currentUser.token}`
                        },
                        body: JSON.stringify({productId, quantity})
                    });
                } catch (error) {
                    console.error(`Failed to sycn quantity: ${error}`);
                }
            }
        },

        // Remove Item
        removeItem: async(productId) => {
            const currentUser = get(user);

            update(items => {
                const newItems = items.filter(i => i.id !== productId);
                if(!currentUser) saveLocal(newItems);
                return newItems;
            });

            if(currentUser){
                await fetch(`${PUBLIC_API_URL_CART}/remove/${productId}`,{
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${currentUser.token}`
                    }
                });
            }
        },

        // CLEAR CART
        clear: async() => {
            set([]);
            const currentUser = get(user);

            if(currentUser){
                await fetch(`${PUBLIC_API_URL_CART}/clear`, {
                    method: "DELETE",
                    headers: {"Authorization": `Bearer ${currentUser.token}`}
                });
            }else{
                saveLocal([]);
            }
        }
    };
}

export const cartStore = createCartStore();

export const cartTotal = derived(cartStore, ($cart) => $cart.reduce((sum, item) => sum +(Number(item.price) * item.quantity), 0));

export const cartCount = derived(cartStore, ($cart) => $cart.reduce((sum, item) => sum + item.quantity, 0));

function createToastStore() {
    const {subscribe, set, update} = writable([]);

    return{
        subscribe, 
        show: (message, type="info", duration = 3000) => {
            const id = Date.now();
            update(toasts => [...toasts, {id, message, type}]);
            setTimeout(() => {
                update(toasts => toasts.filter(t => t.id !== id));
            }, duration);
        },
        dismiss: (id) => {
            update(toasts => toasts.filter(t => t.id !== id));
        }
    };
}

export const toastStore = createToastStore();

export function showToast(message, type ="info"){
    toastStore.show(message, type);
}

export const cart = {
    subscribe: cartStore.subscribe,
    load: cartStore.load,
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clear: cartStore.clear,
}

