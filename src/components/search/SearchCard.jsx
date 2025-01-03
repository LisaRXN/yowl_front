import { Link } from "react-router-dom";
import { LastReviews } from "../LastReviews";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function SearchCard({ business }) {
  const [rating, setRating] = useState(null);
  const [reviewNumber, setReviewnumber] = useState("");
  const [isLoaded, setIsloaded] = useState(false);
  const server = useSelector((state)=>state.server.value)
  const categoryTitle = business?.category.charAt(0).toUpperCase() + business?.category.slice(1);


  let business_image;
  if (business.image.startsWith("http")) {
    business_image = business.image;
  } else {
    business_image = server + business.image;
  }

  const fetchRating = () => {
    axios
      .get(`${server}/api/business/rating/${business.id}`)
      .then((response) => {
        if (response.data.results) {
          console.log(response.data.results);
          setRating(response.data.results[0].rating);
          setReviewnumber(response.data.results[0].reviews_number);
          setIsloaded(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRating();
  }, [business]);

  return (
    isLoaded && (
      <div className="flex flex-col md:flex-row bg-white rouded-lg shadow-sm h-[460px] md:h-[280px] w-full rounded-lg ">
        
        {/* left  */}
        <div className="relative flex flex-col w-full md:w-1/2 h-1/2 md:h-full p-5 gap-2 ">
          
          <div className="flex items-start gap-5 ">
            <div className="h-[100px] w-[100px] rounded-md ">
              <img
                // src={`${server}${business.image}`}
                src={business_image}
                className="h-full w-auto object-cover rounded-md"
              ></img>
            </div>
            <div className="">
              <Link
                className="font-bold text-lg font-jost"
                to={`/business/${business.id}`}
              >
                {business.name}
              </Link>
              <ReactStars
                edit={false}
                count={5}
                size={24}
                activeColor="#ffd700"
                value={rating}
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <span>{reviewNumber} reviews</span>
            <span>{categoryTitle}</span>
          </div>
          <div className="absolute bottom-0 left-0 bg-myviolet w-full flex items-center justify-start gap-3 p-5 md:rounded-bl-lg">
            <img
              className="w-[20px] h-[20px]"
              src="/img/icons/pencil.png"
              alt=""
            />
            <Link
              to={`/business/${business.id}`}
              className="font-bold cursor-pointer text-white "
            >
              Write a review
            </Link>
          </div>
        </div>

        {/* right  */}
        <div className="  w-full md:w-1/2 h-1/2 md:h-full ">
          <LastReviews id={business?.id} />
        </div>
      </div>
    )
  );
}
