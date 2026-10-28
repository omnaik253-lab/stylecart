const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
});

// Get one product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product",
            error: error.message
        });
    }
});

// Add product
router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product added successfully",
            product: product
        });
    } catch (error) {
        res.status(400).json({
            message: "Error adding product",
            error: error.message
        });
    }
});

// Update product
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await product.update(req.body);

        res.json({
            message: "Product updated successfully",
            product: product
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating product",
            error: error.message
        });
    }
});

// Delete product
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await product.destroy();

        res.json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message
        });
    }
});

module.exports = router;