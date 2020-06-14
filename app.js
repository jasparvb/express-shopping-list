const express = require('express');
const ExpressError = require("./expressError")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemRoutes);

// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
        error: err.message,
    });
});

module.exports = app;