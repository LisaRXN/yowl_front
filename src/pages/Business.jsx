import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BusinessCard } from "../components/business/BusinessCard";
import { ReviewCreate } from "../components/reviews/ReviewCreate";
import { ReviewsCard } from "../components/reviews/ReviewsCard";
import { RatingCard } from "../components/rating/RatingCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export function Business() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviewsNumber, setReviewsNumber] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const [reviewsFiltered, setReviewsFiltered] = useState(reviews);
  const dispatch = useDispatch()
  const server = useSelector((state)=>state.server.value)
  

  useEffect(() => {
    axios
      .get(`${server}/api/business/${id}`)
      .then((response) => setBusiness(response.data.results[0]))
      .catch((err) => console.log(err));
    
    axios
      .get(`${server}/api/business/rating/${id}`)
      .then((response) => {
        setRating(response.data.results[0].rating);
        setReviewsNumber(response.data.results[0].reviews_number);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${server}/api/reviews/${id}`)
      .then((response) => {
        const results = response.data.results;
        setReviews(results);
      })
      .catch((err) => console.log(err));
    
  }, [id]);

  useEffect(() => {
    if (reviews.length > 0) {
      setReviewsFiltered(reviews);
    }
  }, [reviews, setReviewsFiltered]);

  return business ? (
    <>
      <BusinessCard
        business={business}
        rating={rating}
        reviewsNumber={reviewsNumber}
        reviews={reviews}
      />

      <ReviewCreate />

      {reviews.length > 0 && (
        <RatingCard
          business_id = {business.id}
          reviewsNumber={reviewsNumber}
          setReviewsFiltered={setReviewsFiltered}
          rating={rating}
        />
      )}

      {reviewsFiltered?.map((review, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-20 w-full m-auto pb-2 "
        >
          <ReviewsCard business_id={id} review={review} />
        </div>
      ))}
    </>
  ) : (
    <div>Loading...</div>
  );
}
