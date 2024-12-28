import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RatingBar } from "../rating/RatingBar";
import ReactStars from "react-rating-stars-component";

export function BusinessCard({ business, rating, reviewsNumber, reviews }) {
  const server = useSelector((state)=>state.server.value)

  let business_image;
  if (business.image.startsWith("http")) {
    business_image = business.image;
  } else {
    business_image = server + business.image;
  }

  return (
    <div className=" flex items-center justify-around bg-slate-700 p-5 md:p-[50px] h-[700px]">
     
      {/* business card */}

      <div className="relative flex flex-col gap-4 p-10 md:p-20 bg-white rounded-xl shadow-lg w-full md:w-8/12 h-[600px] ">
        
        <div className="flex gap-4 md:gap-0">
          {/* top */}
          <div className="md:min-w-48 ">

            <div className="w-[100px] md:w-[150px] rounded-xl shadow">
              {/* <img className="object-cover" src={`${server}${business.image}`}></img> */}
              <img className="object-cover" src={business_image}></img>
            </div>
          </div>

          {/* bottom */}
          <div className="flex flex-col gap-2 ">
            <Link
              to={`/review/${business.id}`}
              className="font-semibold text-2xl md:text-4xl md:py-4"
            >
              {business.name}
            </Link>
            <span className="text-lg">{business.description}...</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:p-5 gap-2">
          <div className="flex flex-col gap-3 md:min-w-48">
            <span className="text-7xl font-bold">
              {Math.round(rating*10)/10}
            </span>
            <ReactStars
              edit={false}
              count={5}
              size={24}
              activeColor="#ffd700"
              value={rating ? rating : null}
            />
            <span>{reviewsNumber} reviews</span>
          </div>
          <RatingBar reviews={reviews} />
        </div>

        <div className=" absolute bottom-0 right-0 flex flex-col items-center justify-end self-end  ">

        <div className="flex items-center gap-3 w-[250px] bg-myviolet p-3 px-4 rounded-br-md rounded-tl-md">
          <img src="/img/icons/link2.png" className="h-[35px] w-[35px]"></img>
          <a href={business.web} target="_blank" className="text-lg text-white">Go to Website</a>
        </div>
        </div>
      </div>
    </div>
  );
}
