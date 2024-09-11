# Table of Contents
- [Table of Contents](#table-of-contents)
  - [Project: Image Management with Vite, React, and TypeScript](#project-image-management-with-vite-react-and-typescript)
    - [Implemented Features](#implemented-features)
  - [Steps to Run the Project](#steps-to-run-the-project)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Enter the project](#2-enter-the-project)
    - [3. Instalar dependencias](#3-instalar-dependencias)
    - [4. Correr proyecto](#4-correr-proyecto)
  - [Pending:Change ImageCard desing in mobiles](#pendingchange-imagecard-desing-in-mobiles)


## Project: Image Management with Vite, React, and TypeScript

This project is a web application created with **Vite**, **React**, and **TypeScript**. Its main objective is to display an image gallery that can be filtered, searched, and marked as favorites. Throughout the development of the project, several key features were implemented:

### Implemented Features

1. **Image Gallery**:
   - Several image cards are displayed in a grid.
   - Each card includes the image title, author, price, and number of "likes."
   - Users can interact with the card to mark images as favorites.

2. **Search Functionality**:
   - Users can search for images using the search box. The results are dynamically filtered as text is entered.

3. **Likes System**:
   - Users can "like" or "unlike" any image. The number of likes is dynamically updated on the image card.

4. **Infinite Scroll**:
   - An infinite scroll system was implemented to load more images as the user reaches the bottom of the page.

5. **Unit Testing**:
   - Unit and integration tests were included to validate the functionality of the main components using **Jest** and **React Testing Library**.

## Steps to Run the Project

### 1. Clone the repository 
```bash
git clone https://github.com/usuario/frontend_test_images.git
```
### 2. Enter the project
```bash
cd frontend_test_images
```
### 3. Instalar dependencias 
```bash
npm install
```
### 4. Correr proyecto
```bash
npm run dev
```

## Pending:Change ImageCard desing in mobiles

Although the application is functioning correctly, modify the design of the ImageCards for mobile view. Currently, the image cards have the same design for all resolutions, but the app is fully responsive. 

- This task can be achieved with any of the following options:
CSS with Media Queries: To hide or show components based on screen size.
- A Custom Hook: To detect the window size and conditionally render different components in React.
- matchMedia API: To detect media queries in JavaScript.

