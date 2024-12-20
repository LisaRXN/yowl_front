import { useSelector } from "react-redux"

export function ReviewCardUser({review}){

  const server = useSelector((state)=>state.server.value)

  let user_avatar;
  if (review.avatar.startsWith("http")) {
    user_avatar = review.avatar;
  } else {
    user_avatar = server + review.avatar;
  }

    return(
        <div className="flex gap-2 pb-2 min-w-1/2">
        <div className="h-[80px] w-[80px] overflow-hidden rounded-md">
          <img
            // src={`${server}${review.avatar}`}
            src={user_avatar}
            className="object-contain h-fit w-fit"
          ></img>
        </div>
        <div className="flex flex-col px-2">
          <span className="text-gray-800 font-bold font-raleway ">
            {review.firstname} {review.lastname}
          </span>
          <span className="text-gray-800 font-light capitalize text-[14px]">
            {review.country}
          </span>
          <span className="text-gray-800 font-light capitalize text-[14px]">
            Total review: 4
          </span>
        </div>
      </div>

    )
}