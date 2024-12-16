import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { StarsRating } from "./rating/StarsRating";
import { useSelector } from "react-redux";

export function LastReviews({ id }) {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const server = useSelector((state)=>state.server.value)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reviews/last/${id}`
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        const data = await response.json();
        setReviews(data.results);
        console.log(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [id]);

  return reviews ? (
    <div className="relative flex flex-col items-center flex-between  bg-slate-200 w-1/2 rounded-r-lg">
      <div className="relative flex flex-col items-center gap-4 flex-between overflow-y-scroll w-3/4 pt-5">
        {reviews.map((review, index) => (
          <div
            onClick={() => navigate(`/business/${review.business_id}`)}
            key={index}
            className=" flex p-5 bg-white rounded w-full shadow-md cursor-pointer "
          >
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 pb-2 w-full">
                <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                  <img
                    src={`${server}${review.avatar}`}
                    className="object-contain h-fit w-fit"
                  ></img>
                </div>
                <ReactStars
                  onChange={()=>{}}
                  edit={false}
                  count={5}
                  size={14}
                  activeColor="#ffaa00"
                  value={review.rating}
                />
              </div>

              <span>{review.content.substring(0, 30)}...</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-mygreen absolute bottom-0 right-0  w-full flex items-center justify-start gap-3 rounded-br-lg p-5 ">
        <img className="w-[20px] h-[20px]" src="/img/icons/eye.png" alt="" />
        <span className="font-bold cursor-pointer ">Last reviews</span>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
