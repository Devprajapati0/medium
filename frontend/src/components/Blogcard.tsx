import { Link } from "react-router-dom"

interface blogcard {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id:string
}

function Blogcard(
    {
        authorName,
        title,
        content,
        publishedDate,
        id,

    }: blogcard
) {
    return (
       <Link to={`/blog/${id}`} >
         <div className=" p-3 border border-b border-slate-200 pb-2">
            <div className="flex pt-3">
                <div className="">
                    <Avatar authorName={authorName} /> </div>
                <div className="text-slate-500 pt-1 pl-3 flex font-normal">{authorName} . {publishedDate}</div>
            </div>

            <div className=" pt-2 text-3xl font-semibold">
                {title}
            </div>
            <div className=" pt-3 text-lg font-thin">
                {content.slice(0, 100) + '...'}
            </div>
            <div className="text-slate-400">
                {`${Math.ceil(content.length / 100)} minutes`}
            </div>
            <div className="bg-slate-200 border-b-4"></div>
        </div>
       </Link>
    )
}

export function Avatar({ authorName }: {
    authorName: string
}) {
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-sm text-gray-600 dark:text-gray-300">{authorName[0]}</span>
        </div>
    )
}

export default Blogcard