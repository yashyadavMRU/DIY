import { prisma } from "../config/db.js";


const getCart = async(req, res) => {
    try {
        const userId = req.user.id;
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        res.status(200).json({
            status: "success",
            cart: cart || { items: [] },
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, message: "Server error"});
    }
};

const addToCart = async(req, res) => {
    try {
        const userId = req.user.id;
        const {productId, quantity = 1} = req.body;

        // It will query and check id the user cart table is there or not
        let cart = await prisma.cart.findUnique({
            where: {
                userId,
            },
        });

        // if there is no user cart for this user create one
        if(!cart){
            cart = await prisma.cart.create({
                data: { userId },
            });
        }

        // check if product already in cart
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId:{
                    cartId: cart.id,
                    productId,
                },
            },
        });

        if(existingItem){
            // increase quantity
            await prisma.cartItem.update({
                where: {id: existingItem.id},
                data: {
                    quantity: existingItem.quantity + 1,
                },
            });
        } else{ 
            // Add new item
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }

        res.status(200).json({
            status: "Success",
            message: "Item added to cart",
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, message: "Server error"});
    }
};

const updateCart = async(req, res) => {
    try {
        const {itemId, quantity} = req.body;
        if(quantity <= 0){
            return res.status(400).json({message: "Invalid quantity"});
        }

        await prisma.cartItem.update({
            where: {id: itemId},
            data: {quantity},
        });

        res.status(200).json({status: "Success", message: "Cart updated"})
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 500,message: "Server Error"});
    }
};

const removeFromCart = async(req, res) => {
    try {
        const itemId = req.params;

        await prisma.cartItem.delete({
            where: { id: itemId},
        });

        res.status(200).json({status: "Succes", message: "Item removed feom cart"});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: 500, message: "Server Error"});
    }
};

export {getCart, addToCart, updateCart, removeFromCart};