import ReactStars from "react-rating-stars-component";
import { RatingBarFilter } from "./RatingBarFilter";

export function RatingCard({ business_id, reviewsNumber, setReviewsFiltered, rating}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between  md:h-[300px]  md:w-3/4 m-auto py-10 md:py-0">
      
      <div className=" flex md:items-center gap-10 w-full md:w-3/4">
      
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center p-5 w-full ">
          <div className="flex flex-col gap-2 md:min-w-48">
            <span className="text-7xl font-bold">
              {Math.round(rating * 10) / 10}
            </span>
            <ReactStars
              key={business_id}
              edit={false}
              count={5}
              size={24}
              activeColor="#ffd700"
              value={rating ? rating : null}
            />
            <span>{reviewsNumber} reviews</span>
          </div>
          <RatingBarFilter setReviewsFiltered={setReviewsFiltered} />
        </div>
      </div>
      <h2 className="p-10 md:p-20 text-4xl text-right font-bold font-montserrat leading-normal">
        Discover <br></br>
        <span className="text-mygreen">YOWL</span> <br></br>Opinions
      </h2>
    </div>
  );
}
