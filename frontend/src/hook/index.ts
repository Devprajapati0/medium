import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface prop{
    title:string,
    content:string,
    author:{
        name:string
    },
    id:string,
    publishedDate:string

}
export const useBlog = () => {
    const navigate =useNavigate()
    const [loading,setLoading] = useState<boolean>(true)
    const [blog,setBlogs] = useState<prop[]>([])

    
    useEffect(()=>{
try {
    axios.get(' https://medium.devprajapati742.workers.dev/api/v1/blog/getallblog',{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
    .then((response)=>{setBlogs(response.data.postFound)})
            setLoading(false)
} catch (error) {
    navigate('/signin')
}
    },[navigate])


    return {
        loading,blog
    }
}

interface hub{
    id: string;
    title: string;
    content: string;
    author:{
        name:string
    } 
}

export const useSingle = ({postid}:{postid:string}) =>{
    const [loading,setLoading] = useState<boolean>(true)
    const [blog,setBlog] = useState<hub>()

    useEffect(()=>{
        async function api(){
            axios.get(` https://medium.devprajapati742.workers.dev/api/v1/blog/getblog/${postid}`,{
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            .then((response)=>{setBlog(response.data.id),console.log("datblog",response)})
                    setLoading(false)
        }
        api()
            },[postid])

    return {
        loading,blog
    }
}
