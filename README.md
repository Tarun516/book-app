# Book Exchange Portal

A full-stack web application designed to facilitate book exchanging or renting. Users can register as either "Owners" to list books they wish to share or "Seekers" to browse available listings. The application supports user authentication, role-based access, and CRUD operations for book listings, with a responsive frontend and a robust backend.

## Features

- **User Authentication**: Register, login, and logout functionality.
- **Role-Based Access**: 
  - *Owners* can create, edit, and delete book listings.
  - *Seekers* can browse and filter listings.
- **Book Listing Management**:
  - Owners can add new books with details like title, author, genre, location, contact info, and an optional cover image.
  - Edit existing listings or toggle their status between "Available" and "Rented/Exchanged."
  - Delete listings as needed.
- **Search and Filter**: Seekers can filter listings by genre and location.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
- **File Uploads**: Owners can upload cover images for their book listings.

## Technologies

### Backend
- **Node.js with Express.js**: Powers the server-side logic and API endpoints.
- **MongoDB with Mongoose**: Database for storing user and book data.
- **Multer**: Handles file uploads for book cover images.

### Frontend
- **Next.js**: React framework for building the client-side application.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Makes HTTP requests to the backend API.

### Authentication
- **Local Storage**: Stores user data on the client side (for development purposes; not recommended for production).

## Installation

Follow these steps to set up and run the project locally.

### Prerequisites
- **Node.js**: Version 14 or higher.
- **MongoDB**: Either a local instance or a MongoDB Atlas cloud database.

### Backend Setup
1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the `backend` directory.
   - Add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```
   - Replace `your_mongodb_connection_string` with your MongoDB connection string (e.g., from MongoDB Atlas or a local instance).

4. **Start the Backend Server**:
   ```bash
   npm run dev
   ```
   - The server will run on `http://localhost:5000`.

### Frontend Setup
1. **Navigate to the Client Directory**:
   ```bash
   cd client
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Next.js Development Server**:
   ```bash
   npm run dev
   ```
   - The frontend will run on `http://localhost:3000`.

## Usage

1. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

2. **Register an Account**:
   - Click "Register" in the navigation bar.
   - Fill in your details (name, mobile number, email, password) and select a role ("Owner" or "Seeker").

3. **Log In**:
   - Use your email and password to log in from the homepage.

4. **As an Owner**:
   - Go to the "Dashboard" to add new book listings with details and an optional cover image.
   - View and manage your listings (edit, delete, or toggle status).

5. **As a Seeker**:
   - Visit the "Listings" page to browse all available books.
   - Use the filters to narrow down by genre or location.

6. **Log Out**:
   - Click "Logout" in the navigation bar to end your session.
