const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); 

dotenv.config({ path: "./Config/config.env" });

// Import the connectToDatabase function from the database configuration file
const connectToDatabase = require("./Config/database");
const app = express();

// Middleware to convert string Json to object
app.use(express.json());
app.use(cors()); //  Enable CORS for all routes
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./Routes/Auth.routes");
const userRoutes = require("./Routes/User.routes");

const PORT = process.env.PORT || 4000;

// Call the connectToDatabase function to establish the database connection
connectToDatabase();

// API ENDPOINTS
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is working on port http://localhost:${PORT}`);
});
