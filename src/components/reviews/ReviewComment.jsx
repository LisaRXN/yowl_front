import { useSelector } from "react-redux";

export function ReviewComment({ comment }) {

  const server = useSelector((state)=>state.server.value)

  return (
    <div className="flex items-center gap-4 border-t-2 pt-4">
      <div className="h-[35px] w-[35px] overflow-hidden rounded-md">
        {/* <img src={`${server}${comment.avatar}`} className="object-cover h-full w-full"></img> */}
        <img src={comment.avatar} className="object-cover h-full w-full"></img>
      </div>
      <div className="flex flex-col items-start">
      <span>{comment.firstname}</span>
      <span className="text-md text-slate-500">{comment.comment}</span>
      </div>
    </div>
  );
}
