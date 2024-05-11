import { Hono } from "hono";
import { jwtverify } from "../middleare/auth";
import {PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchema,updateBlogSchema, createBlogSchema,getBlogSchema } from "@devprajapati/medium";

export const blogRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string
    },
    Variables:{
      authen:string
    }
  }>()

  blogRouter.use('/*',jwtverify);


  
blogRouter.post('/create',async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const createblogdata =  createBlogSchema.safeParse(await c.req.json())
    if(!createblogdata.success){
     return c.json(
         {
             error:"incorrect credentials"
         }
     )
    }
    try {
        const id = c.get('authen');

       const postCreated =  await prisma.post.create({
            data:{
                title:  createblogdata.data.title,
                content:createblogdata.data.content,
                author:{
                    connect:{
                        id:id
                    }
                }
            }
        })
        if(!postCreated){
            return c.json(
                {
                    error:"postcreation problem"
                }
            )
        }

        console.log(postCreated)

        c.status(200)
        return c.json(
            {
                message:"successfully create dpost",
                id:postCreated            },
        )
    } catch (error) {
        c.status(411)
        return c.json(
            {
                error:error
            }
        )
    }
   
})


  
blogRouter.patch('/update',async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const updateblogdata =  updateBlogSchema.safeParse(await c.req.json())

    if(!(updateblogdata.success )){
     return c.json(
         {
             error:"incorrect credentials"
         }
     )
    }
    console.log('dat:',updateblogdata.data)
    try {
        const authorid = c.get('authen');
        //  const postiddata =  c.req.param('postid')
        // const {title,content,published} =await c.req.json()

       const postUpdated =  await prisma.post.update({
        where:{
            id:updateblogdata.data.postid,
        },
        data:{
            title:updateblogdata.data.title,
            content:updateblogdata.data.content,
        }
    })
    console.log('pdated posy',postUpdated)
        if(!postUpdated){
            return c.json(
                {
                    error:"postUpdated problem"
                }
            )
        }

        console.log(postUpdated)

        c.status(200)
        return c.json(
            {
                message:"successfully create dpost",
                id:postUpdated
            },
        )
    } catch (error) {
        c.status(411)
        return c.json(
            {
                error:error
            }
        )
    }
   
})

 
blogRouter.get('/getblog/:postid',async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const authorid = c.get('authen');
        const postid =  c.req.param('postid')
        console.log("posyid",postid)
       const postFound =  await prisma.post.findUnique({
        where:{
            id:postid,
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
     
    })
    // console.log("\authen:",postid);
    // console.log("authoid:",authorid);
    // console.log("postfound:",postFound);
    
        if(!postFound){
            return c.json(
                {
                    error:"postFound problem"
                }
            )
        }

        console.log(postFound)

        c.status(200)
        return c.json(
            {
                message:"successfully create dpost",
                id:postFound
            },
        )
    } catch (error) {
        c.status(411)
        return c.json(
            {
                error:error
            }
        )
    }
   
})


blogRouter.get('/getallblog',async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
       const postFound =  await prisma.post.findMany(
        {
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        }
       )
        if(!postFound){
            return c.json(
                {
                    error:"postFound problem"
                }
            )
        }

        console.log(postFound)

        c.status(200)
        return c.json(
            {
                message:"successfully create dpost",
                postFound
            },
        )
    } catch (error) {
        c.status(411)
        return c.json(
            {
                error:error
            }
        )
    }
   
})

