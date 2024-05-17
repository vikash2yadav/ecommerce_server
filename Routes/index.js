module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to ecommerce");
    });

    // user route
    app.use("/user", require("./users"));

    // product route
    app.use("/product", require("./products"));

    // role route
    app.use("/role", require("./roles"));

    // categories route
    app.use("/category", require("./categories"));

};
