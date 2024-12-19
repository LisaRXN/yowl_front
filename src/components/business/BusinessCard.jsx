import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RatingBar } from "../rating/RatingBar";
import ReactStars from "react-rating-stars-component";

export function BusinessCard({ business, rating, reviewsNumber, reviews }) {
  const server = useSelector((state)=>state.server.value)


  return (
    <div className=" flex items-center justify-around bg-slate-700 p-[50px] h-[700px]">
     
      {/* business card */}

      <div className="relative flex flex-col gap-4 p-20 bg-white rounded-xl shadow-lg w-8/12">
        <div className="flex ">
          {/* top */}
          <div className="min-w-48 ">
            <div className="h-[150px] w-[150px] rounded-xl shadow">
              {/* <img className="object-cover" src={`${server}${business.image}`}></img> */}
              <img className="object-cover" src={business.image}></img>
            </div>
          </div>
          {/* bottom */}
          <div className="flex flex-col gap-2 ">
            <Link
              to={`/review/${business.id}`}
              className="font-semibold text-4xl py-4"
            >
              {business.name}
            </Link>
            <span className="text-lg">{business.description}...</span>
          </div>
        </div>

        <div className="flex items-center p-5  ">
          <div className="flex flex-col gap-3 min-w-48">
            <span className="text-7xl font-bold">
              {Math.round(rating*10)/10}
            </span>
            <ReactStars
              edit={false}
              count={5}
              size={24}
              activeColor="#ffd700"
              value={rating}
            />
            <span>{reviewsNumber} reviews</span>
          </div>
          <RatingBar reviews={reviews} />
        </div>

        <div className=" absolute bottom-0 right-0 flex flex-col items-center justify-end self-end  ">

        <div className="flex items-center gap-3 w-[250px] bg-myviolet p-3 px-4 rounded-br-md rounded-tl-md">
          <img src="/img/icons/link2.png" className="h-[35px] w-[35px]"></img>
          <span className="text-lg text-white">Go to Website</span>
        </div>

        {/* <div className="flex items-center gap-3 w-[220px]  p-2">
          <img src="/img/icons/favorite.png" className="h-[40px] w-[40px]"></img>
          <span className="font-semibold text-lg">Add to favorites</span>
        </div> */}

        </div>

      </div>


      {/* information */}
      {/* <div className="flex flex-col items-start bg-white  h-[500px] rounded-xl p-10 gap-4 w-1/4">
        <span className="font-semibold text-4xl py-4">Information</span>


        <div className="flex flex-col gap-2">
          <span className="font-semibold">Categories</span>
          <li>Sportwear</li>
          <li>Clothing store</li>
          <li>Shoe store</li>
          <li>Skate shop</li>
        </div>
      </div> */}
    </div>
  );
}
