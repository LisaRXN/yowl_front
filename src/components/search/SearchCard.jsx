import { Link } from "react-router-dom";
import { LastReviews } from "../LastReviews";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

export function SearchCard({ business }) {

  const ratingValue = useSelector((state) => state.rating.value); 

  return (
    <div className=" flex flex-col gap-20 w-full items-center   ">
      {business.map((b, index) => (
        <div
          key={index}
          className="flex  bg-white rouded-lg shadow-sm h-[280px] w-full rounded-lg "
        >
          {/* //presentation */}
          <div className="relative flex gap-5 justify-between w-full  ">
            <div className="flex flex-col p-5  w-1/2 ">
              <div className="flex items-center gap-5 ">
                <div className="h-[100px] w-[100px] rounded-md ">
                  <img
                    src={b.image}
                    className="h-full w-auto object-cover rounded-md"
                  ></img>
                </div>
                <div className="">
                  <Link
                    className="font-bold text-lg font-jost"
                    to={`/business/${b.id}`}
                  >
                    {b.name}
                  </Link>
                  <ReactStars
                    count={5}
                    size={18}
                    activeColor="#ffd700"
                    value={ratingValue}
                  />
                </div>
              </div>
              <div className="flex flex-col ">
                <span>{b.reviews_number} reviews</span>
                <span>{b.category}</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 bg-myviolet w-full flex items-center justify-start gap-3 p-5 rounded-b-lg">
              <img
                className="w-[20px] h-[20px]"
                src="/img/icons/pencil.png"
                alt=""
              />
              <Link
                to={`/business/${b.id}`}
                className="font-bold cursor-pointer text-white "
              >
                Write a review
              </Link>
            </div>
            <LastReviews id={b.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
