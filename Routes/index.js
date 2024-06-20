module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to ecommerce");
    });

    // user route
    app.use("/user", require("./users"));

    // user address route
    app.use("/user_address", require("./user_addresses"));

    // admin route
    app.use("/admin", require("./admins"));

    // partner route
    app.use("/partner", require("./partners"));

    // product route
    app.use("/product", require("./products"));

    // role route
    app.use("/role", require("./roles"));

    // categories route
    app.use("/category", require("./categories"));

    // orders route
    app.use("/order", require("./orders"));

    // order items route
    app.use("/order_item", require("./order_items"));

    // product reviews route
    app.use("/product_review", require("./product_reviews"));

    // cart route
    app.use("/cart", require("./carts"));

    // product faq route
    app.use("/product_faq", require("./product_faqs"));

    // product faq reaction route
    app.use("/product_faq_reaction", require("./product_faq_reactions"));

    // payment route
    app.use("/payment", require("./payments"));

    // wishlist route
    app.use("/wishlist", require("./wishlists"));

    // coupon route
    app.use("/coupon", require("./coupons"));

    // user coupon relations route
    app.use("/user_coupon_relation", require("./user_coupon_relations"));

    // language route
    app.use("/language", require("./languages"));

    // new_release route
    app.use("/new_release", require("./new_releases"));

    // modules route
    app.use("/module", require("./modules"));

    // attributes route
    app.use("/attribute", require("./attributes"));

    // attribute values route
    app.use("/attribute_value", require("./attribute_values"));

    // product variants route
    app.use("/product_variant", require("./product_variants"));

    // order cart route
    app.use("/cart_item", require("./cart_items"));

    // common route
    app.use("/common", require("./common"));
};
