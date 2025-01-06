import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";

export function UserReviewsCard(review) {
  const navigate = useNavigate();
  const server = useSelector((state) => state.server.value);
  const business_id = review.review.business_id;
  const [business, setBusiness] = useState();
  let business_image = null

  if(business){
    if (business?.image.startsWith("http")) {
      business_image = business.image;
    } else {
      business_image = server + business.image;
    }
  }


  const fetchBusiness = () => {
    axios
      .get(`${server}/api/business/${business_id}`)
      .then((response) => {
        console.log(response.data.results[0]);
        setBusiness(response.data.results[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBusiness();
  }, [review]);

  return (
    <div
      onClick={() => navigate(`/business/${business_id}`)}
      className=" flex p-5 bg-white rounded w-full shadow-md cursor-pointer "
    >
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2 pb-2 w-full">
          <div className="h-[40px] w-[40px] rounded-lg overflow-hidden">
            <img
              src={business_image }
              className="object-contain h-fit w-fit"
            ></img>
          </div>
          <ReactStars
            onChange={() => {}}
            edit={false}
            count={5}
            size={14}
            activeColor="#ffaa00"
            value={review?.review.rating}
          />
          <span className="ml-auto">{formatDate(review.review.createdAt)}</span>
        </div>

        <span>{review.review.content}</span>
      </div>
    </div>
  );
}
