import z from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type SignIpInput = z.infer<typeof signinInput>;
export declare const createblogInput: z.ZodObject<{
    title: z.ZodString;
    Context: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    Context: string;
}, {
    title: string;
    Context: string;
}>;
export type CreateBlogInput = z.infer<typeof createblogInput>;
export declare const updateblog: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    Context: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    Context?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    Context?: string | undefined;
}>;
export type Updateblog = z.infer<typeof updateblog>;
