const express = require("express");
const router = express.Router();
const db = require("../db");


//   CREATE
router.post("/", async (req, res) => {
  try {
    const { CustID, CustName, CustAddress, CustPAN, CustGST, isActive } = req.body;

    await db.query(
      "INSERT INTO Customers VALUES (?, ?, ?, ?, ?, ?)",
      [CustID, CustName, CustAddress, CustPAN, CustGST, isActive]
    );

    res.json("Customer added successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//   READ ALL
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Customers");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//   READ ONE
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM Customers WHERE CustID = ?",
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//   UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { CustName, CustAddress, CustPAN, CustGST, isActive } = req.body;

    await db.query(
      `UPDATE Customers 
       SET CustName=?, CustAddress=?, CustPAN=?, CustGST=?, isActive=?
       WHERE CustID=?`,
      [CustName, CustAddress, CustPAN, CustGST, isActive, req.params.id]
    );

    res.json("Customer updated successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//   DELETE
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM Customers WHERE CustID=?", [req.params.id]);
    res.json("Customer deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;