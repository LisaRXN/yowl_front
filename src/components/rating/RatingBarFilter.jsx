import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../../store/reviewsSlice"
import { BarFilter } from "./BarFilter";

export function RatingBarFilter({setReviewsFiltered}) {

  const reviews = useSelector((state) => state.reviews.value);

  const total = reviews.length
  const count_1 = (reviews.filter(review => review.rating === 1).length/total)*100;
  const count_2 = (reviews.filter(review => review.rating === 2).length/total)*100;
  const count_3 = (reviews.filter(review => review.rating === 3).length/total)*100;
  const count_4 = (reviews.filter(review => review.rating === 4).length/total)*100;
  const count_5 = (reviews.filter(review => review.rating === 5).length/total)*100;

  const handleReviews = (e) => {
    const rating = e.currentTarget.name;
    const checked = e.target.checked;

    if (checked) {
      const reviewsFilter = reviews.filter(review => review.rating === parseInt(rating));
      setReviewsFiltered(reviewsFilter)
    } else {
      setReviewsFiltered(reviews)
    }
  };

  return (

    <div className="flex flex-col w-1/2 gap-2">

      <BarFilter number='5' count={Math.round(count_5*10)/10} handleReviews={handleReviews} />
      <BarFilter number='4' count={Math.round(count_4*10)/10} handleReviews={handleReviews} />
      <BarFilter number='3' count={Math.round(count_3*10)/10} handleReviews={handleReviews} />
      <BarFilter number='2' count={Math.round(count_2*10)/10} handleReviews={handleReviews} />
      <BarFilter number='1' count={Math.round(count_1*10)/10} handleReviews={handleReviews} />

    </div>
  );
}
