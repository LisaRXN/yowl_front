export function ReviewCardLikes({handleComment,handleLike,handleDislike, hasLiked, comment, like, dislike}){

    return(
        <div className="flex gap-4 items-center pt-10">
        <div className="flex items-center gap-1">
          <span>
            <img
              onClick={handleComment}
              className="h-[45px] w-[45px] border-2 border-slate-200 p-3 rounded-md cursor-pointer "
              src="/img/icons/comment.png"
            ></img>
          </span>
          <p className="text-slate-500 text-sm">{comment}</p>
        </div>
        <div className="flex items-center gap-1">
          <span>
            <img
              onClick={handleLike}
              className="h-[45px] w-[45px] border-2 border-slate-200 p-3 rounded-md cursor-pointer "
              src={ hasLiked ? "/img/icons/heart_pink.png" : "/img/icons/heart_green.png" }
              ></img>
          </span>
          <p className="text-slate-500 text-sm">{like}</p>
        </div>
        <div className="flex items-center gap-1">
          <span>
            <img
              onClick={handleDislike}
              className="h-[45px] w-[45px] border-2 border-slate-200 p-2.5 rounded-md cursor-pointer "
              src="/img/icons/shit.png"
            ></img>
          </span>
          <p className="text-slate-500 text-sm">{dislike}</p>
        </div>
      </div>
        
    )
}