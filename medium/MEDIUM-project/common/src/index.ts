import { Context } from "hono";
import { useActionData } from "react-router-dom";
import z from "zod";
export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})
export type SignupInput = z.infer<typeof signupInput>
export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})
export type SignIpInput = z.infer<typeof signinInput>
export const createblogInput = z.object({
    title: z.string(),
    Context: z.string(),
})
export type CreateBlogInput = z.infer<typeof createblogInput>
export const updateblog = z.object({
    title: z.string().optional(),
    Context: z.string().optional(),
    id: z.string()
})
export type Updateblog = z.infer<typeof updateblog>