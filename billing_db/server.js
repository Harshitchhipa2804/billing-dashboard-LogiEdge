const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const customerRoutes = require("./routes/customers");
const itemRoutes = require("./routes/items"); //   NEW

// API Routes
app.use("/api/customers", customerRoutes);
app.use("/api/items", itemRoutes); //   NEW

// Default Route (Optional but useful)
app.get("/", (req, res) => {
    res.send("API is running  ");
});

// Server Start
app.listen(5000, () => {
    console.log("Server running on port 5000  ");
});