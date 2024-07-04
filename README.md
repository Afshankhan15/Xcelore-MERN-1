# XCELORE MERN ASSESSMENT 

## Project Overview

### Frontend

- Implemented user registration and login functionality.
- Utilized protected routes to differentiate between admin and user access.

### Admin Panel Features

- **CRUD Operations**: Admins can create, update, delete, and fetch user data from the backend.
- **User Management**: Display user data fetched from the backend on the UI.
- **Search Functionality**: Admins can search users by firstname, lastname, or email with debouncing.
- **Pagination**: Implemented pagination for user search results.

### Technologies Used

- **State Management**: Utilized Redux for managing application state.
- **Styling**: Implemented responsive design using Tailwind CSS.
- **User Interface**: Integrated Font Awesome icons for UI enhancements.
- **Notifications**: Used Toast for user-friendly notification messages.
- **Routin**:Use React Router for navigation.
- **Authentication**: Use JWT (JSON Web Tokens) for managing authentication.
- **Password Hashing**: Use bcrypt for password hashing.
- **Role-based Access Control**: Implement middleware to check user roles.

### Validation

- Implemented form validation during registration and user creation/editing to ensure data integrity and user experience.


## Backend Overview

### Technologies Used

- **Node.js**: Used as the runtime environment for server-side code.
- **MongoDB Atlas**: Cloud-based MongoDB service used for database storage.
- **Joi**: Utilized for input validation to ensure data integrity and security.

### Project Structure

#### Config

Contains configuration files, including environment variables and database connections.

#### Models

Defines MongoDB schema models for structured data storage.

#### Routes

Handles API endpoints and routes requests to appropriate controllers.

#### Middleware

Implements middleware functions for request handling, such as authentication and error handling.

#### Controller

Contains logic to handle user requests and interact with the database.

### Authentication and Authorization

- Implemented **JWT (JSON Web Token)** for secure authentication.
- Tokens are stored in **localStorage** on the client-side and expire after **1 hour** for enhanced security.
- **checkAuth Function**: Integrated in protected components to validate tokens and user roles, granting access to endpoints based on role permissions.

