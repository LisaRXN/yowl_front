import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RatingBar } from "../rating/RatingBar";
import ReactStars from "react-rating-stars-component";

export function BusinessCard({ business, rating, reviewsNumber, reviews }) {


  return (
    <div className="flex  items-center justify-around bg-slate-700 p-[50px] h-[700px]">
      {/* business card */}
      <div className="flex flex-col gap-4 p-20 bg-white w-7/12 h-[500px] rounded-xl shadow-lg">
        <div className="flex ">
          {/* left */}
          <div className="min-w-48 ">
            <div className="h-[150px] w-[150px] rounded-xl shadow">
              <img className="object-cover" src={`${business.image}.png`}></img>
            </div>
          </div>
          {/* rigtht */}
          <div className="flex flex-col gap-2 ">
            <Link
              to={`/review/${business.id}`}
              className="font-semibold text-4xl py-4"
            >
              {business.name}
            </Link>
            <span>{business.description}...</span>
          </div>
        </div>

        <div className="flex items-center p-5 ">
          <div className="flex flex-col gap-2 min-w-48">
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
      </div>

      {/* information */}
      <div className="flex flex-col items-start bg-white  h-[500px] rounded-xl p-10 gap-4 w-1/4">
        <span className="font-semibold text-4xl py-4">Information</span>
        <div>
          <img src=""></img>
          <span className="font-semibold">Accepted Profile</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Categories</span>
          <li>Sportwear</li>
          <li>Clothing store</li>
          <li>Shoe store</li>
          <li>Skate shop</li>
        </div>
      </div>
    </div>
  );
}
