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

    // orders route
    app.use("/order", require("./orders"));

    // product reviews route
    app.use("/product_review", require("./product_reviews"));

    // cart route
    app.use("/cart", require("./carts"));

    // cart route
    app.use("/product_faq", require("./product_faqs"));

    // cart route
    app.use("/product_faq_reaction", require("./product_faq_reactions"));

};
