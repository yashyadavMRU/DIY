from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import json
import time

# chrome options
options = Options()
options.add_argument("--start-maximized")
# initialize a Chrome web driver instance
driver = webdriver.Chrome(options=options)

# the URL of the target page
url = "https://www.alibaba.com/search/page?spm=a2700.product_home_fy25.home_login_first_screen_fy23_pc_search_bar.keydown__Enter&SearchScene=proSearch&SearchText=drone&pro=true&from=pcHomeContent"


# connect to the target url
driver.get(url)

# wait until products load
wait = WebDriverWait(driver, 20)
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".fy26-product-card-wrapper")))
time.sleep(5)

# Store the scrapped data
products = []

# selecting product from the page
product_elements = driver.find_elements(By.CSS_SELECTOR, ".fy26-product-card-wrapper")

# productImage = ".searchx-product-e-slider__img"
# product_description = ""
# product_price = ".searchx-product-price"
# product_manufacturer = ".searchx-product-e-company"

for product_element in product_elements:
    try:
        # extracting the product details
        img_element = product_element.find_element(By.CSS_SELECTOR, ".searchx-product-e-slider__img")
        img = img_element.get_attribute("src")

        description_element = product_element.find_element(By.CSS_SELECTOR,"h2.searchx-product-e-title a")
        description = description_element.text.strip()
        product_link = description_element.get_attribute("href")

        if product_link and product_link.startswith("//"):
            product_link = "https:" + product_link 

        price_element = product_element.find_element(By.CSS_SELECTOR,".searchx-product-price")
        price = price_element.text.strip()

        company_element = product_element.find_element(By.CSS_SELECTOR,".searchx-product-e-company")
        company = company_element.text.strip()

        # product dictonary
        product = {
            "img": img,
            "description": description,
            "price": price,
            "company": company,
            "product_link" : product_link,
        }

        # add the product dictonary to the array
        products.append(product)
    except Exception:
        continue

# save data to JSON
json_filename = "../Backend/src/data/products.json"
with open(json_filename, mode = "w", encoding="utf-8") as file:
    json.dump(products, file, ensure_ascii=False, indent=4)

driver.quit()
print("Saved", len(products), "products to products.json")