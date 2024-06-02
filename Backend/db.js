const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.n0xu9h0.mongodb.net/todos')

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const user = mongoose.model('Todo', userSchema);

module.exports = {
    user,
};
