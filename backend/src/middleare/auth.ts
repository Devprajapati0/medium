import {sign, verify} from "hono/jwt"
import { Hono } from "hono"

const app = new Hono<{
    Bindings : {
        JWT_SECRET : string
      },
      Variables:{
        authen:string
      }
}>()

export const jwtverify = async(c,next)=>{
    try {
        const token = c.req.header('Authorization')?.replace("Bearer ", "") 
   
        if(!token){
          return c.json({
            error:"okk not okk"
            
          })
        }
      
        const jwt =await verify(token,c.env.JWT_SECRET)
      
        if(jwt.id){
    
          c.req.auth = jwt.id
          c.set('authen',jwt.id)
        await next()}
    } catch (error) {
      return c.json({
        message:"error jwt me agya"
      })
    }
    }
    