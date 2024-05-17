module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to ecommerce");
    });

    // user route
    app.use("/user", require("./users"));

};
