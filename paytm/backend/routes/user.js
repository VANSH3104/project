const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User } = require('../root/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');
const { Accountdata } = require('../root/db');
const createUserSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});
router.post('/signup', async (req, res) => {
    const newUser = req.body;
    const parseResult = createUserSchema.safeParse(newUser);

    if (!parseResult.success) {
        return res.status(400).json({
            message: 'Incorrect inputs',
            errors: parseResult.error.errors
        });
    }

    const userExist = await User.findOne({ username: newUser.username });
    if (userExist) {
        return res.status(409).json({
            message: 'Email already taken'
        });
    }

    const user = await User.create(newUser);
    await Accountdata.create({
        userId: user._id,
        balance: 1 + Math.random() * 100000
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
        message: 'User created successfully',
        token
    });
});
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
        message: 'Signin successful',
        token
    });
});

// Zod schema for updating user details
const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

// Update user route
router.put('/', authMiddleware, async (req, res) => {
    const updateData = req.body;
    const parseUpdate = updateSchema.safeParse(updateData);

    if (!parseUpdate.success) {
        return res.status(400).json({
            message: 'Error while updating information',
            errors: parseUpdate.error.errors
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);
    res.json({
        message: 'Updated successfully'
    });
});
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router;
