# Task Management

## Overview

Task Management is a web-based application designed to help users efficiently organize and track their daily tasks. It provides a user-friendly interface to manage tasks, set priorities, and track progress.

## Live Demo

[Task Management App](#) <!-- Replace # with the actual live demo URL -->

## Features

- ✅ User authentication with Firebase  
- ✅ Create, edit, and delete tasks  
- ✅ Set task priorities and due dates  
- ✅ Mark tasks as complete  
- ✅ Real-time synchronization using Firebase Firestore  
- ✅ Responsive design for mobile and desktop users  

## Dependencies

This project relies on the following dependencies:

- **Node.js** - Runtime environment  
- **React** - JavaScript library for building UI components  
- **Firebase** - Backend services, including authentication and Firestore  
- **Tailwind CSS** - Utility-first CSS framework for styling  
- **React Router** - Client-side routing for navigation  

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/nmmaharaz/Task_Management
   ```
   
2. **Navigate to the project directory:**
   ```sh
   cd taskmanagement
   ```

3. **Install required dependencies:**
   ```sh
   npm install
   ```

4. **Configure Firebase:**
   - Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
   - Set up Firestore and Authentication.
   - Create a `.env` file in the project root and add your Firebase credentials:

   ```sh
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server:**
   ```sh
   npm start
   ```

6. **Open the app in your browser:**
   - Navigate to [http://localhost:3000/](http://localhost:3000/)

## Technologies Used

This project is built using:

- **React** - Component-based frontend framework  
- **Firebase Firestore** - Real-time NoSQL database  
- **Firebase Authentication** - User authentication and authorization  
- **Tailwind CSS** - Modern utility-first styling framework  
- **React Router** - Handles navigation between different pages  
- **ESLint & Prettier** - Code formatting and linting tools  

## Contributing

We welcome contributions! If you would like to contribute:

1. **Fork the repository.**  
2. **Create a new branch:**  
   ```sh
   git checkout -b feature-branch
   ```
3. **Make your changes and commit:**  
   ```sh
   git commit -m "Added new feature"
   ```
4. **Push to your branch:**  
   ```sh
   git push origin feature-branch
   ```
5. **Open a pull request.**

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, reach out to us at [nmmaharaz@gmail.com](mailto:nmmaharaz@gmail.com).
