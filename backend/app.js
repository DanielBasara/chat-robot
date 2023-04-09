const express = require("express");
const app = express();
const translateRouter = require("./translateRouter.js");
const port = process.env.PORT || 5000;

// Middleware for parsing JSON data
app.use(express.json());

// Example API endpoint
app.use("/api", translateRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
