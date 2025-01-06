import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";

export function UserReviewsCard({review, fetchReviews}) {
  const navigate = useNavigate();
  const server = useSelector((state) => state.server.value);
  const business_id = review.business_id;
  const [business, setBusiness] = useState();
  let business_image = null;

  console.log(review)

  if (business) {
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


  const handleDelete = () => {
    axios
    .get(`${server}/api/reviews/delete/${review.id}`)
    .then((response) => {
      if (response.data.results) {
        console.log(response.data.results)
        fetchReviews();
    }
    })
    .catch((error) => {
      console.error("There was an error deleting review:", error);
    });
  }

  return (
    <div className="flex w-full gap-x-6">
      <div
        onClick={() => navigate(`/business/${business_id}`)}
        className=" flex p-5 bg-white rounded w-full shadow-md cursor-pointer "
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2 pb-2 w-full">
            <div className="h-[40px] w-[40px] rounded-lg overflow-hidden">
              <img
                src={business_image}
                className="object-contain h-fit w-fit"
              ></img>
            </div>
            <ReactStars
              onChange={() => {}}
              edit={false}
              count={5}
              size={14}
              activeColor="#ffaa00"
              value={review?.rating}
            />
            <span className="ml-auto">
              {formatDate(review.createdAt)}
            </span>
          </div>

          <span>{review.content}</span>
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <button
          onClick={handleDelete}
          className="text-white bg-myviolet w-[100px] rounded-xl px-4 py-2 hover:bg-mygreen "
          type="submit"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
