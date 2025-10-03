# Bahrain_line
Bahrain Line is an app for traditional and handicrafts shops, showcasing a variety of authentic products. Users can explore and support local artisans while enjoying a seamless shopping experience.

## Overview
Bahrain Line is a web-based application dedicated to promoting traditional crafts and handicrafts from Bahrain. The app serves as a digital marketplace where users can explore a rich variety of authentic products made by local artisans. With a focus on preserving cultural heritage, Bahrain Line provides a platform for artisans to showcase their work, enabling users to support local craftsmanship while enjoying a seamless shopping experience. The user-friendly interface makes it easy to browse categories, view product details, and make secure purchases, all while celebrating the unique artistry of Bahrain.

[Web link]()
![main page]()

## Table of Contents
- [Features](#features)
- [Usage Instructions](#usage-instructions)
- [Functions Overview](#functions-overview)
- [Technologies Used](#technologies-used)
- [Planned Future Enhancements](#planned-future-enhancements)
- [References](#references)

## Features
- Browse a diverse selection of authentic traditional crafts.
- User-friendly interface for easy navigation and product discovery.
- Detailed product descriptions.
- Admin can add, edit, delete any (Item or Category)

## Usage Instructions
- Explore Products: Navigate through the app to browse various categories of traditional crafts.
- View Product Details: Click on any item to see detailed descriptions and artisan information.
- Search Functionality: Use the search bar to quickly find any category that interest you.
- Return to Home: Use the home button to easily return to the main browsing page at any 

## Functions Overview

`browseProducts()`

*Displays a list of available items to explore, retrieving data from the database.*

`filterByCategory(Id)`

*Applies filters to show products within a selected category, enhancing the browsing experience.*

`viewProductDetails(Id)`

*Fetches and displays detailed information about the selected product, including descriptions and artisan details.*

`addNewItem(itemData, images)`

*Handles the creation of a new item, saving relevant details and uploading associated images to Cloudinary.*

`addNewCategory(categoryData)`

*Creates a new category in the database, ensuring no duplicates exist.*

`deleteItem(Id)`

*Deletes an item from the database and removes associated images from Cloudinary.*

`deleteCategory(Id)`

*Deletes a category and all related items from the database.*

`updateItem(Id, updatedData, newImages)`

*Updates the details of an existing item, including replacing old images with new uploads if provided.*

`updateCategory(Id, updatedData)`

*Updates the name or details of an existing category and adjusts related items accordingly.*

`getCategories()`

*Retrieves the list of all categories from the database for display in various views.*

`renderErrorPage(errorMessage)`

*Displays a user-friendly error page with a relevant message when an error occurs.*

## Technologies Used
- JavaScript: Powers the application’s logic and interactivity.
- HTML: Provides the structural foundation for the web pages.
- CSS: Enhances the visual design and layout of the application.
- Git: For version control.

## Planned Future Enhancements
Here are some planned future enhancements for the Bahrain Line app:

1. **Back Office Functionality:**
Develop a supplier app to manage inventory and track item availability, enhancing the administrative capabilities of the platform.

2. **Additional Functions for Back Office:**
Implement features that streamline the management of items and categories, improving the overall efficiency for suppliers.

3. **Enhanced User Experience:**
Focus on further optimizing the user interface for mobile devices, ensuring a responsive and touch-friendly design.

## References
- [1] [Atlas DataBase (mongodb)](https://www.mongodb.com/products/platform/atlas-database) MongoDB Atlas is a fully managed cloud database service that simplifies the deployment.
- [2] [Cloudinary cloud storage](https://cloudinary.com/) Cloudinary is a powerful media management platform that provides image and video upload.
- [3] [Heroku internet server](https://dashboard.heroku.com/) Heroku is a cloud platform that enables developers to build, run, and operate applications entirely in the cloud.