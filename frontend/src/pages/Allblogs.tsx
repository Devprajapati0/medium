import Appbar from "../components/Appbar"
import Blogcard from "../components/Blogcard"
import Blogskeleton from "../components/Blogskeleton"
import { useBlog } from "../hook"

// interface blog{

// }

function Allblogs() {
    const {loading,blog} = useBlog()
    if(loading){
        return <><Blogskeleton />
        <Blogskeleton />
        <Blogskeleton />
        <Blogskeleton /><Blogskeleton /></>
    }
  return (
<div className="flex justify-center">
<div className=" max-w-xl">
    <Appbar />
    {blog.map((singleblog) => (
                    <Blogcard
                    key={singleblog.id} // Add a unique key prop for each mapped component
                    title={singleblog.title}
                    authorName={singleblog.author.name}
                    publishedDate={singleblog.publishedDate} // Assuming this should be a date
                    content={singleblog.content}
                    id={singleblog.id} // Assuming each blog has an id property
                />
                ))}

         
   </div>
</div>
  )
}

export default Allblogs