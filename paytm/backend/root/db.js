const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin:admin@cluster0.n0xu9h0.mongodb.net/payTm').then(() => {
    console.log("Connection to the database successful");
}).catch((err) => {
    console.error("Error in connection to the database", err);
});
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 25,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    }
});
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    balance: {
        type: Number,
        required: true,
    }
});
const User = mongoose.model("User", userSchema);
const Accountdata = mongoose.model("Account", accountSchema);

module.exports = ({
    User,
    Accountdata
})
