import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signupInput = z.infer<typeof signupSchema>;
export type signinInput = z.infer<typeof signinSchema>;
export declare const createBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    postid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postid: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    postid: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export declare const getBlogSchema: z.ZodObject<{
    postid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postid: string;
}, {
    postid: string;
}>;
export type updateBlogInput = z.infer<typeof updateBlogSchema>;
export type createBlogInput = z.infer<typeof createBlogSchema>;
export type getBlogInput = z.infer<typeof getBlogSchema>;
