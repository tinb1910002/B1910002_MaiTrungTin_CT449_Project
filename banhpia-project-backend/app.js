const express = require("express");
const cors = require("cors");
const productsRouter = require("./app/routes/product.route");
const usersRouter = require("./app/routes/user.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

//handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

//Define error-handling middleware last
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to product book application."});
});

module.exports = app;