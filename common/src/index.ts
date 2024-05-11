import {z} from "zod"

//User
export const signupSchema = z.object({
    name:z.string().optional(),
    email:z.string().email(),
    password:z.string().min(4)
})

export const signinSchema = z.object({
    email:z.string().email(),
    password:z.string().min(4)
})

export type signupInput = z.infer<typeof signupSchema>
export type signinInput = z.infer<typeof signinSchema>


//Blog
export const createBlogSchema = z.object({
    title:z.string(),
    content:z.string(),
})

export const updateBlogSchema = z.object({
    title:z.string().optional(),
    content:z.string().optional(),
    postid:z.string()
})


export const getBlogSchema = z.object({
    postid:z.string()
})



export type updateBlogInput = z.infer<typeof updateBlogSchema>
export type createBlogInput = z.infer<typeof createBlogSchema>
export type getBlogInput = z.infer<typeof getBlogSchema>