import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
function Update() {
    const {id} = useParams()
    console.log('id',id)

    const naviagte  =useNavigate()
    const [data,setData] = useState<{title:string,content:string,postid:string}>({
        title:'',
        content:'',
        postid:''
    })
    console.log("obj",{
        ...data,
        postid:id
     })
    const handleclick = async() => {
     try {
          await axios.patch('http://localhost:8787/api/v1/blog/update',{
            ...data,
            postid:id
         },{
               headers:{
                   Authorization:localStorage.getItem('token')
               }
           })

           
           naviagte(`/blog/${id}`)
     } catch (error) {
        alert('error while creating')
     }


    }


    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
  return (
   <div>
    
<div className="mb-6">
    <p className="block mb-2 text-sm font-medium text-black">Title:</p>
    <input type="text" onChange={handlechange} name='title' value={data.title} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
</div>
<div className="mb-6">
    <p className="block mb-2 text-sm font-medium text-black">Content</p>
    <input type="text"  onChange={handlechange} name='content' value={data.content} id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" />
</div>
<div>
<button onClick={handleclick} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Publish</button>
</div>

   </div>
  )
}



export default Update