import { Hono } from 'hono'
import {PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {sign, verify} from "hono/jwt"
import { jwtverify } from '../middleare/auth'
import {signupSchema,signinSchema} from "@devprajapati/medium"


export const userRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string,
      JWT_SECRET : string
    },
    Variables:{
      authen:string
    }
  }>()

userRouter.post('/signup', async(c)=>{
    const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL
   }).$extends(withAccelerate())
  
   const signupdata =  signupSchema.safeParse(await c.req.json())
   if(!signupdata.success){
    return c.json(
        {
            error:"incorrect credentials"
        }
    )
   }

  try {
    const existedUser = await prisma.user.findUnique(
      {
          where:{
              email:signupdata.data.email,
              password:signupdata.data.password
          }
      }
  )
  
  if(existedUser)
      {
          c.status(403)
          return c.json(
              {
                  error: "have account already"
              }
          )
      }
   
      const user = await prisma.user.create({
           data:{
               name: signupdata.data.name || null,
               email: signupdata.data.email,
               password: signupdata.data.password
           }
       })
       console.log(user)
   
       const token = await sign(
           {
               id: user.id
           },
           c.env.JWT_SECRET
       )
   
       return c.json({
          token: token,
           message:"user ccreated successfully"
       })
  } catch (error) {
   c.status(403)
   return c.json({
       error:"error while sign u"
   })
  }
  
  })
  
  userRouter.post('/signin',async(c)=>{
  
   const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL
   }).$extends(withAccelerate())
  
   const signindata =  signinSchema.safeParse(await c.req.json())
   if(!signindata.success){
    return c.json(
        {
            error:"incorrect credentials"
        }
    )
   }
  
  try {
      const user = await prisma.user.findUnique(
           {
               where:{
                   email:signindata.data.email,
                   password:signindata.data.password
               }
           }
       )
    //    console.log("authenticmkss",c.req.auth)// giving ts error 
    // cnsole.log("probab",c.get("authen"))
       if(!user)
           {
               c.status(403)
               return c.json(
                   {
                       error: "user not found"
                   }
               )
           }
   
      const token = await sign(
           {
               id:user.id
           },
           c.env.JWT_SECRET
       )
   
       c.status(200)
       return c.json(
           {
            token: token,
           message: "loginned sucessfully"
           }
       )
  } catch (error) {
   c.status(403)
   return c.json(
       {
           error: "problem whle login"
       }
   )
  }
  
  
  }
  )
  
  
