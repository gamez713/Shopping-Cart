# Shopping Cart Application

A responsive and dynamic shopping cart application built with **React**, **TypeScript**, and **Vite**.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Project Overview

This application showcases a simple e-commerce-like experience where users can browse a store, add items to a cart, adjust quantities, and view the cart's total price. Built to be highly responsive, the app uses Bootstrap for styling and a custom hook for localStorage-based state persistence.

## Features

1. **Store Page**: Browse a selection of items with details like name, price, and image.
2. **Cart Management**:
   - Add items to the cart with a single click.
   - Increase or decrease item quantities directly from the cart or store.
   - Remove items from the cart.
3. **Persistent Storage**: Cart items and quantities are saved in localStorage to persist even after the page is refreshed.
4. **Responsive Design**: Uses Bootstrap and custom styling for a mobile-friendly layout.
5. **Dynamic Total Calculation**: The cart updates the total dynamically as items are added or removed.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm run dev
    ```

## Usage

1. **Home Page**: View links to the Store and About pages.
2. **Store Page**: Click "Add to Cart" to add an item. Use the increment (`+`) and decrement (`-`) buttons to adjust quantities.
3. **Cart**:
   - Access the cart from the button in the navigation bar. 
   - View items, adjust quantities, and see the total price.
4. **Persisted Data**: Reloading the page maintains cart items and quantities.