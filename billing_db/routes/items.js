const express = require("express");
const router = express.Router();
const db = require("../db");


//   GET ALL ITEMS
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Items");
        res.json(rows);
    } catch (err) {
        res.status(500).json(err);
    }
});


//   GET SINGLE ITEM
router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM Items WHERE ItemCode=?",
            [req.params.id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json(err);
    }
});


//   CREATE ITEM
router.post("/", async (req, res) => {
    try {
        const { ItemCode, ItemName, SellingPrice, IsActive } = req.body;

        await db.query(
            "INSERT INTO Items VALUES (?, ?, ?, ?)",
            [ItemCode, ItemName, SellingPrice, IsActive]
        );

        res.json("Item added  ");
    } catch (err) {
        res.status(500).json(err);
    }
});


//   UPDATE ITEM
router.put("/:id", async (req, res) => {
    try {
        const { ItemName, SellingPrice, IsActive } = req.body;

        await db.query(
            `UPDATE Items 
       SET ItemName=?, SellingPrice=?, IsActive=?
       WHERE ItemCode=?`,
            [ItemName, SellingPrice, IsActive, req.params.id]
        );

        res.json("Item updated  ");
    } catch (err) {
        res.status(500).json(err);
    }
});


//   DELETE ITEM
router.delete("/:id", async (req, res) => {
    try {
        await db.query(
            "DELETE FROM Items WHERE ItemCode=?",
            [req.params.id]
        );
        res.json("Item deleted  ");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;