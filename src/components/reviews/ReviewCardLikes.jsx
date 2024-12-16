export function ReviewCardLikes({
  handleComment,
  handleLike,
  handleDislike,
  hasLiked,
  comment,
  like,
  dislike,
  comments_count,
  hasComment
}) {
  return (
    <div className="flex gap-4 items-center pt-10 pb-2">
      <div className="flex items-center gap-1">
            <img
            onClick={handleComment}
            className="h-[45px] w-[45px] border-2 border-slate-200 p-3 rounded-md cursor-pointer "
            src={ hasComment ? "/img/icons/com_violet2.png" : "/img/icons/comment.png" }
          ></img>
        <p className="text-slate-500 text-sm">{comments_count != 0 ? comments_count : ""}</p>
      </div>
      <div className="flex items-center gap-1">
        <span>
          <img
            onClick={handleLike}
            className="h-[45px] w-[45px] border-2 border-slate-200 p-3 rounded-md cursor-pointer "
            src={
              hasLiked
                ? "/img/icons/heart_pink.png"
                : "/img/icons/heart_white.png"
            }
          ></img>
        </span>
        <p className="text-slate-500 text-sm">{like ? like : ""}</p>
      </div>
      {/* <div className="flex items-center gap-1">
          <span>
            <img
              onClick={handleDislike}
              className="h-[45px] w-[45px] border-2 border-slate-200 p-2.5 rounded-md cursor-pointer "
              src="/img/icons/shit.png"
            ></img>
          </span>
          <p className="text-slate-500 text-sm">{dislike}</p>
        </div> */}
    </div>
  );
}
