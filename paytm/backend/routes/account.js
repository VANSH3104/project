const {mongoose} = require('mongoose')
const {authMiddleware} = require("../middleware");
const {Accountdata} = require("../root/db");
const express =  require("express");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Accountdata.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount , to} = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const account = await Accountdata.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const sendaccount = await Accountdata.findOne({ userId: to }).session(session);
        console.log(sendaccount)
        if (!sendaccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Invalid account" });
        }

        await Accountdata.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        await Accountdata.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();
        session.endSession();

        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports= router;
