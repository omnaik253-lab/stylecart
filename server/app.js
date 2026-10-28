const express = require("express");
const cors = require("cors");

const { connectDB, sequelize } = require("./config/database");

const Product = require("./models/Product");
const Order = require("./models/Order");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Home test
app.get("/", (req, res) => {
    res.send("StyleCart API is running!");
});

// Products
app.use("/api/products", productRoutes);

// GET all orders
app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: [["createdAt", "DESC"]]
        });

        res.json(orders);
    } catch (error) {
        console.error("GET ORDERS ERROR:", error);

        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
});

// POST new order
app.post("/api/orders", async (req, res) => {
    try {
        console.log("ORDER RECEIVED:", req.body);

        const order = await Order.create(req.body);

        console.log("ORDER SAVED:", order.id);

        res.status(201).json({
            message: "Order placed successfully",
            order: order
        });
    } catch (error) {
        console.error("ORDER SAVE ERROR:", error);

        res.status(400).json({
            message: "Error placing order",
            error: error.message
        });
    }
});

// Start server
const PORT = 5001;

const startServer = async () => {
    try {
        await connectDB();

        await sequelize.sync();

        console.log("Database tables synced successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Server startup error:", error);
    }
};

startServer();