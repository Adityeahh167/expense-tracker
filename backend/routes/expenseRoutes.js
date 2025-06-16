const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel
} = require("../controllers/expenseController.js");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ STATIC ROUTES FIRST
router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);

// ✅ DYNAMIC ROUTES LAST
router.delete("/:id", protect, deleteExpense);

module.exports = router;
