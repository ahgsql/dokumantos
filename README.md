# dokumantos

Welcome to **dokumantos** – your go-to solution for managing personalized documentation effortlessly!

## Overview

**dokumantos** is a project aimed at creating a comprehensive repository for organizing and accessing frequently used code snippets, Linux commands, and various other pieces of information. It's designed to provide a seamless experience in storing, retrieving, and collaborating on essential documentation.
Build with Vite,NextUI,Tailwind, Express MongoDB, and other tools.
This Project also contains advanced example of CRUD operations for dynamically created content. (See [Categories.jsx](https://github.com/ahgsql/dokumantos/blob/main/front/src/pages/Categories.jsx) )

### Project Structure

The repository consists of two main folders:

- **front:** Contains the frontend project.
- **server:** Contains the backend server.

## Frontend (front)

### Tech Stack

- **Framework:** React
- **Bundler:** Vite
- **CSS Framework:** Tailwind CSS
- **React Library :** Next UI

### Getting Started

To run the frontend project:

1. Navigate to the `front` folder:

   ```bash
   cd front
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Additionally, for Tailwind CSS during development, run:
   ```bash
   npm run tailwind
   ```

The frontend server will start on port 4000 by default.

## Backend (server)

### Tech Stack

- **Framework:** Express
- **Database:** MongoDB with Mongoose

### Getting Started

To run the backend server:

1. Navigate to the `server` folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   - For normal start:
   ```bash
   node server.js
   ```
   - For development with watch mode:
   ```bash
   node --watch server.js
   ```

The backend server will start accordingly.

## Planned Enhancements

- **User Authentication:** Implementing user accounts and authentication for personalized documentation management.
- **Markdown Support:** Adding Markdown for better documentation formatting and readability.
- **Version Control:** Incorporating version control for tracking changes and managing revisions.
- **Export and Integration:** Providing options for exporting documentation and integrating with external platforms.

## Contributing

We welcome contributions! To contribute to **dokumantos**, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/yourfeature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add your feature'`).
5. Push to the branch (`git push origin feature/yourfeature`).
6. Create a pull request.

## Feedback

Your feedback and suggestions are highly appreciated! Feel free to open an issue to report bugs, request features, or share your thoughts on **dokumantos**.

---

**Let's collaborate and simplify documentation management together with dokumantos!**
