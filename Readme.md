# Nova Books Server

This project is a server-side application for Nova Books, built with Node.js and Express. It uses MongoDB for the database and JSON Web Tokens (JWT) for authentication.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/download/) (which includes npm).
- You have a MongoDB database set up.
- You have a JWT secret key for authentication.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/b9a11-server-side-HunterMahmud.git
   cd nova-books-server
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of your project and add your MongoDB credentials and JWT secret key. This file should include at least the following:

   ```env
   DB_USER=your_db_user
   DB_PASS=your_db_password
   SECRET=your_jwt_secret
   ```

   Replace `your_db_user`, `your_db_password`, and `your_jwt_secret` with your actual MongoDB credentials and JWT secret key.

## Usage

### Development Server

To start the development server with automatic reloading, run:

```bash
npm run dev
```

### Production Server

To start the production server, run:

```bash
npm start
```

This will start the server using Node.js.

## Project Structure

- `index.js`: The main entry point of the server application and all api.


## Additional Information

### Dependencies

- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: The official MongoDB driver for Node.js.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **cors**: For enabling Cross-Origin Resource Sharing.
- **cookie-parser**: For parsing cookies attached to the client request object.

For a complete list of dependencies, refer to the `package.json` file.

### Environment Variables

Make sure to keep your `.env` file secure and do not commit it to version control. Use `.gitignore` to exclude it from your repository:

```plaintext
.env
```

## Contributing

If you have any suggestions or improvements, feel free to open an issue or submit a pull request.



### Notes:
- Replace `"https://github.com/Porgramming-Hero-web-course/b9a11-server-side-HunterMahmud.git"` with the actual URL of your repository.
- Ensure your MongoDB credentials and JWT secret key are correctly set in the `.env` file.
- Adjust any additional instructions or configurations specific to your project.
