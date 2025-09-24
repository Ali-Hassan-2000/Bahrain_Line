# Project Description:
The Bahrain Line Shop is a user-friendly web application designed to showcase and manage a variety of products inspired by the rich culture and heritage of Bahrain. This platform allows users to browse items by category, view detailed product descriptions, and facilitate an engaging shopping experience for both customers and administrators.

**Welcome to Bahrain line shop, You can visit the web by following the link below:**
**[app link]()**

# App Features
1. **User Authentication:** Secure sign-up and login functionality for admins to manage the shop effectively.
2. **Product Management:** Admins can create, update, and delete items, ensuring that the product catalog remains current and relevant.
3. **Category Browsing:** Users can explore items categorized into various sections, such as traditional crafts, clothing, and souvenirs, making it easy to find specific products.
4. **Detailed Item Views:** Each item features comprehensive details, including images, descriptions, and prices, to enhance the shopping experience.

# User Stories:
1.**User Authentication**

    As an admin, I want to sign up and log in securely so that I can manage the shop without unauthorized access.

2.**Browse Items**

    As a user, I want to browse items by category so that I can easily find products that interest me.

3.**View Item Details**

    As a user, I want to click on an item to view its details, including images, descriptions, and prices, so that I can make informed purchasing decisions.

4.**Add New Items**

    As an admin, I want to add new items to the catalog so that I can keep the shop updated with fresh products.

5.**Edit Existing Items**

    As an admin, I want to edit details of existing items (e.g., price, description) so that the information remains accurate and current.

6.**Delete Items**

    As an admin, I want to delete items from the catalog so that I can remove products that are no longer available.

7.**View All Categories**

    As a user, I want to view all available categories on the site so that I can explore the diversity of products offered.


# Pseudocode:

* **User Authentication Functions**
    ```
        1. signUp(username, password)
            Steps:
            Check if the username already exists in the database.
            If it does, return a message indicating the username is taken.
            If not, hash the password for security.
            Save the new admin information (username and hashed password) to the database.
            Return a success message.
            logIn(username, password)

        2. logIn(username, password)
            Steps:
            Retrieve the admin from the database using the provided username.
            If the admin does not exist, return a "admin not found" message.
            If the admin exists, check the provided password against the stored hashed password.
            If the password matches, create a admin session and return a success message.
            If the password does not match, return an "Incorrect password" message.
    ```

* **Item Management Functions**
    ````
        1. AddItem(itemName, itemPrice, itemDescription, itemImg, itemCategory)
            Steps:
            Create an item object with the provided details (name, price, description, image, category).
            Save this item object to the database.

        2. editItem(itemId, updatedFields)
            Steps:
            Retrieve the item from the database using the provided item ID.
            If the item exists, update it with the new fields provided.
            Save the updated item back to the database.

        3. deleteItem(itemId)
            Steps:
            Retrieve the item from the database using the provided item ID.
            Remove it from the database.
    ````

* **Browsing Items Functions**
    ````
        1. getAllCategories()
            Steps:
            Fetch the list of categories from the database.
            Return the list of categories.

        2. getItemsByCategory(categoryId)
            Steps:
            Fetch items from the database that match the provided category ID.
            Return the list of items found.
    ````

# Useful pics:

### Home page:
![home page]()