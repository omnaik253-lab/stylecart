const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
    try {
        const order = await Order.create(req.body);

        res.status(201).json({
            message: "Order placed successfully",
            order: order
        });
    } catch (error) {
        res.status(400).json({
            message: "Error placing order",
            error: error.message
        });
    }
});

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: [["createdAt", "DESC"]]
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
});

module.exports = router;