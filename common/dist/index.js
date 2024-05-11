"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogSchema = exports.updateBlogSchema = exports.createBlogSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
//User
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4)
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(4)
});
//Blog
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    postid: zod_1.z.string()
});
exports.getBlogSchema = zod_1.z.object({
    postid: zod_1.z.string()
});
