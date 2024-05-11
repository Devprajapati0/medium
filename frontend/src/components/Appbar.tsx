import { Link } from "react-router-dom"
import { Avatar } from "./Blogcard"
import { useNavigate } from "react-router-dom"

function Appbar() {
  const naigate = useNavigate()
  return (
    <div className="border-b flex justify-between px-10 py-3 " >
       <Link to={'/allblog'}>
       <div>
            Medium
        </div></Link>
        <div>
            <Avatar authorName="dev" />
        </div>
        <div>
        <button onClick={()=>naigate('/createblogs')} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
  publish
</button>
        </div>
        </div>
  )
}

export default Appbar