import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function CommentCreate({user, review_id, fetchComments, setHascomment}) {

  const user_id = user.id
  const [newComment, setNewcomment] = useState('')
  const server = useSelector((state)=> state.server.value)

  let user_avatar;
  if (user?.avatar.startsWith("http")) {
    user_avatar = user.avatar;
  } else if(user?.avatar.startsWith("/images")){
    user_avatar = server + user.avatar;
  }

  const handleSubmit = () => {
    axios
      .post(`http://localhost:3000/api/comments/create`, {
        "user_id": user_id,
        "review_id" : review_id,
        "comment" : newComment
      })
      .then(() => {
        console.log("Comment sent successfully!");
        setNewcomment("");
        fetchComments()
        setHascomment(true)
      })
      .catch((err) => console.log("Error: " + err.message));

  }

  
  return (
    <div className="flex items-center gap-4 border-t-2 pt-4">
      <div className="min-h-[35px] min-w-[35px] h-[35px] w-[35px] overflow-hidden rounded-md">
        {/* <img src={`${server}${user.avatar}`} className="object-cover h-full w-full"></img> */}
        <img src={user_avatar ?  user_avatar : "/img/users/avatar.png"} className="object-cover h-full w-full"></img>
      </div>
      <input
        type="text"
        onChange={(e) => { setNewcomment(e.target.value);}}
        value={newComment}
        placeholder="Write a comment..."
        autoFocus
        className="text-slate-500 text-md bg-transparent outline-none focus:ring-0"
      />
      <button onClick={handleSubmit} className="text-sm p-2  bg-myviolet rounded-lg"><img src="/img/icons/send.png" className="h-[12px] w-[12px]"/></button>
    </div>
  );
}
