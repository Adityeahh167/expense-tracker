const xlsx=require('xlsx')
const Expense = require('../models/expense');


exports.addExpense = async (req, res) => {
  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const newExpense = new Expense({
      userId: req.user._id,
      icon,
      category,
      amount,
      date: parsedDate,
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getAllExpense=async(req,res)=>{
    const userId=req.user.id;
    try {
        const expense=await Expense.find({userId}).sort({date:-1});
        res.json(expense)
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}

exports.deleteExpense=async(req,res)=>{
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense Deleted Successfully"})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"Server Error"})
    }
}

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expense.map((item) => ({
      category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    }));

    // Create workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // Write to buffer (in-memory)
    const buffer = xlsx.write(wb, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Set headers to trigger download
    res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    // Send the file
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};