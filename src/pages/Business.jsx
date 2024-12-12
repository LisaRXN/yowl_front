import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BusinessCard } from "../components/business/BusinessCard";
import { ReviewCreate } from "../components/reviews/ReviewCreate";
import { ReviewsCard } from "../components/reviews/ReviewsCard";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setRating } from "../store/ratingSlice";
import { setReviews } from "../store/reviewsSlice";
import { RatingCard } from "../components/rating/RatingCard";
import axios from "axios";

export function Business() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviewsNumber, setReviewsNumber] = useState(0);
  const [reviews, setReviews] = useState([]);
  const rating = useSelector((state) => state.rating.value, shallowEqual);
  // const reviews = useSelector((state) => state.reviews.value, shallowEqual);
  const [reviewsFiltered, setReviewsFiltered] = useState(reviews);
  const dispatch = useDispatch();

  console.log("reviews", reviews, id)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/business/${id}`)
      .then((response) => setBusiness(response.data.results[0]))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/api/business/rating/${id}`)
      .then((response) => {
        dispatch(setRating(response.data.results[0].rating));
        setReviewsNumber(response.data.results[0].reviews_number);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/api/reviews/${id}`)
      .then((response) => {
        console.log("result review", response)
        const results = response.data.results;
        setReviews(results)
      })
      .catch((err) => console.log(err));
  }, [id, dispatch]);


  useEffect(() => {
    setReviewsFiltered(reviews);
  }, [reviews]);

  return business ? (
    <>
      <BusinessCard
        business={business}
        rating={rating}
        reviewsNumber={reviewsNumber}
        reviews={reviews}
      />

      <ReviewCreate />

      <RatingCard
        reviewsNumber={reviewsNumber}
        setReviewsFiltered={setReviewsFiltered}
      />

      {reviewsFiltered.map((review, index) => (
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






  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       //business
  //       const businessResponse = await fetch(
  //         `http://localhost:3000/api/business/${id}`
  //       );
  //       if (!businessResponse.ok) {
  //         throw new Error(
  //           "Erreur lors de la récupération des données business"
  //         );
  //       }
  //       const businessData = await businessResponse.json();
  //       setBusiness(businessData.results[0]);

  //       //rating
  //       const ratingResponse = await fetch(
  //         `http://localhost:3000/api/business/rating/${id}`
  //       );
  //       if (!ratingResponse.ok) {
  //         throw new Error("Erreur lors de la récupération des données rating");
  //       }
  //       const ratingData = await ratingResponse.json();
  //       dispatch(setRating(ratingData.results[0].rating));
  //       setReviewsNumber(ratingData.results[0].reviews_number);

  //       //reviews
  //       const reviewsResponse = await fetch(
  //         `http://localhost:3000/api/reviews/${id}`
  //       );
  //       if (!reviewsResponse.ok) {
  //         throw new Error("Erreur lors de la récupération des données reviews");
  //       }
  //       const reviewsData = await reviewsResponse.json();
  //       console.log(reviewsData.results.length);
  //       dispatch(setReviews(reviewsData.results));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [id, dispatch]);