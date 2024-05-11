import { useParams } from 'react-router-dom'
import { useSingle } from '../hook'
import Appbar from '../components/Appbar'
import Blogskeleton from '../components/Blogskeleton'
import { useNavigate } from 'react-router-dom'

function Blog() {
const {postid} = useParams()
const navigate = useNavigate()
  const {loading,blog} = useSingle({postid : postid || ''})
  if(loading || !blog){
    return <Blogskeleton />
    navigate('/signin')
  }
  return (
    <div>
 <Fullblog blog={blog} />
    </div>
  )
}


interface sub{
  id: string;
  title: string;
  content: string;
  author:{
      name:string
  } 
}
function Fullblog({blog}:{blog:sub}){
  const navigate = useNavigate()
  return (
    <div>
      <Appbar />
  <div className='flex justify-center'>
  <div className='grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12'>
      <div className='col-span-8'>
        <div className='text-5xl font-extrabold'>
          {blog.title }
        </div>
        <div className='text-slate-500 pt-2'>
          Post on 2nd December 2023
        </div>
        <div className='pt-4' >
          {blog.content}
        </div>
        <div className='bg-screen-200 col-spn-4'>
       Author: {blog.author.name || 'anomys'}
       </div>
      </div>
    </div>
    <button onClick={()=>navigate(`/update/${blog.id}`)} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">update</button>
    </div>
  </div>
  )
}

export default Blog