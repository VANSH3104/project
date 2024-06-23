import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from "@vanshnpm/medium-commonn";

export const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

// Signup route
userRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        // Validate the request body against the signup schema
        const result = signupInput.safeParse(body);
        if (!result.success) {
            return c.json({ msg: "Invalid input", errors: result.error.errors }, 400);
        }

        const user = await prisma.user.create({
            data: {
                email: result.data.username,
                password: result.data.password,
                name: result.data.name || null,
            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            message: "User created successfully",
            jwt_token: token
        });
    } catch (error) {
        console.error("Signup error:", error);
        return c.json({ msg: "Error in signup" }, 500);
    }
});

// Signin route
userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        // Validate the request body against the signin schema
        const result = signinInput.safeParse(body);
        if (!result.success) {
            return c.json({ msg: "Invalid input", errors: result.error.errors }, 400);
        }

        const user = await prisma.user.findUnique({
            where: {
                email: result.data.username,
            }
        });
        if (!user || user.password !== result.data.password) {
            return c.json({ msg: "Invalid email or password" }, 401);
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
            message: "Sign-in successful",
            jwt_token: token
        });
    } catch (error) {
        console.error("Signin error:", error);
        return c.json({ msg: "Error in sign-in" }, 500);
    }
});
