import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../../store/reviewsSlice";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReviewCardUser } from "./ReviewCardUser";
import { ReviewCardLikes } from "./ReviewCardLikes";

export function ReviewsCard({ business_id, review }) {
  const [comment, setComment] = useState(null);
  const [likes, setLikes] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState("");
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isLikeCreated, setIsLikeCreated] = useState(false);
  const user_id = useSelector((state) => state.user.value.id);
  const review_id = review.review_id
  const dispatch = useDispatch();



  const handleComment = () => setComment();

  const updateReviewsInRedux = () => {
    axios
      .get(`http://localhost:3000/api/reviews/${business_id}`)
      .then((response) => dispatch(setReviews(response.data.results)))
      .catch((err) => console.log(err));
  };

  const isLikeInDatabase = () => {
    axios
      .get(
        `http://localhost:3000/api/likes/get_likes_user_review/${user_id}/${review_id}`
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          setIsLikeCreated(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const reviewIsLiked = () => {
    axios
      .get(
        `http://localhost:3000/api/likes/get_likes_user/${user_id}/${review_id}`
      )
      .then((response) => {
        if (response.data.results && response.data.results.length > 0) {
          setHasLiked(response.data.results[0].is_liked);
          setHasDisliked(response.data.results[0].is_disliked);


        }
      })
      .catch((err) => console.log(err));
  };

  const likes_count = () => {
    axios
      .get(`http://localhost:3000/api/likes/get_likes_review/${review_id}`)
      .then((response) => {
        if (response.data.results && response.data.results.length > 0) {
          setLikes(response.data.results[0].likes_count);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updateReviewsInRedux();
    reviewIsLiked();
    likes_count();
    isLikeInDatabase();
  }, [business_id, user_id]);


  const updateLike = () => {
    const newLikeStatus = !hasLiked;
    const url = isLikeCreated
      ? `http://localhost:3000/api/likes/update`
      : "http://localhost:3000/api/likes/create";
  
      console.log("URL de la requête :", url);

    axios
      .post(url, {
        user_id,
        review_id,
        is_liked: newLikeStatus,
        is_disliked: hasDisliked,
      })
      .then(() => {
        console.log("Like créé avec succès !");
        reviewIsLiked();
        likes_count();
        setHasLiked(!hasLiked);
        setIsLikeCreated(true)
      })
      .catch((err) => {
        console.error("Erreur lors de la création du like:", err);
        setHasLiked(!newLikeStatus);
        setLikes((prev) => (newLikeStatus ? prev - 1 : prev + 1));
      });
  };


  // const updateLike = () => {
  //   const newLikeStatus = !hasLiked;

  //   setHasLiked(newLikeStatus);
  //   setLikes((prev) => (newLikeStatus ? prev + 1 : prev - 1));

  //   const url = isLikeCreated
  //     ? `http://localhost:3000/api/likes/update`
  //     : "http://localhost:3000/api/likes/create"

  //   axios
  //     .post(url, {
  //       user_id: user_id,
  //       review_id: review_id,
  //       is_liked: newLikeStatus,
  //       is_disliked: hasDisliked,
  //     })
  //     .then(() => {
  //       console.log("Review updated successfully!");
  //       reviewIsLiked();
  //       likes_count();
  //       setHasLiked(!hasLiked);
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //       setHasLiked(!newLikeStatus);
  //       setLikes((prev) => (newLikeStatus ? prev - 1 : prev + 1));
  //     });
  // };

  const updateDislike = () => {
    const newDislikeStatus = !hasDisliked;

    if (newDislikeStatus) {
      setHasLiked(false);
      setLikes(0);
    }

    setHasDisliked(newDislikeStatus);
    setDislikes((prev) => (newDislikeStatus ? prev + 1 : prev - 1)); // Incrémente/décrémente les dislikes

    const url = isLikeCreated
      ? `http://localhost:3000/api/likes/update`
      : `http://localhost:3000/api/likes/create`;

    axios
      .put(url, {
        user_id: user_id,
        review_id: review_id,
        is_liked: hasLiked,
        is_disliked: newDislikeStatus,
      })
      .then(() => {
        console.log("Review updated successfully!");
        reviewIsLiked();
        likes_count();
        // setHasLiked(!hasLiked);
      })
      .catch((err) => {
        console.log(err);
        setHasDisliked(!newDislikeStatus);
        setDislikes((prev) => (newDislikeStatus ? prev - 1 : prev + 1));
      });
  };

  // const handleDislike = async () => {
  //   const newDislikes = hasDisliked ? dislike - 1 : dislike + 1;
  //   const newLikes = hasLiked ? like - 1 : like;

  //   setDislike(newDislikes);
  //   setHasDisliked(!hasDisliked);
  //   if (hasLiked) {
  //     setLike(newLikes);
  //     setHasLiked(false);
  //   }
  //   axios
  //     .put(`http://localhost:3000/api/reviews/likes`, {
  //       id: review.review_id,
  //       likes: newLikes,
  //       dislikes: newDislikes,
  //     })
  //     .then(() => {
  //       console.log("Review updated successfully!");
  //       updateReviewsInRedux();
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="flex p-5 border-solid border-t-2 w-3/4  ">
      <div className="flex">
        <div className="flex flex-row gap-10">
          <ReviewCardUser review={review} />

          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <ReactStars
                edit={false}
                count={5}
                size={14}
                activeColor="#ffaa00"
                value={review.rating}
              />
              <span className="font-extralight text-sm">
                {review.createdAt}
              </span>
            </div>

            <span className="text-gray-800 font-semibold">{review.title} </span>
            <span className="text-gray-600 font-light">{review.content}</span>

            <ReviewCardLikes
              handleComment={handleComment}
              handleLike={updateLike}
              handleDislike={updateDislike}
              hasLiked={hasLiked}
              comment={comment}
              like={likes}
              dislike={dislikes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// const handleLike = async () => {
//   const newLike = hasLiked ? like - 1 : like + 1;
//   const newDislike = hasDisliked ? dislike - 1 : dislike;

//   setLike(newLike);
//   setDislike(newDislike);
//   setHasLiked(!hasLiked);
//   if (hasDisliked) {
//     setHasDisliked(false);
//   }
//   const params = {
//     "id": review.review_id,
//     "likes": newLike,
//     "dislikes": newDislike,
//   };
//   await useUpdate("http://localhost:3000/api/reviews/likes", params);
//   updateReviewsInRedux();
// };

// const handleDislike = async () => {
//   const newDislikes = hasDisliked ? dislike - 1 : dislike + 1;
//   const newLikes = hasLiked ? like - 1 : like;

//   setDislike(newDislikes);
//   setHasDisliked(!hasDisliked);
//   if (hasLiked) {
//     setLike(newLikes);
//     setHasLiked(false);
//   }

//   const params = {
//     "id": review.review_id,
//     "likes": newLikes,
//     "dislikes": newDislikes,
//   };
//   await useUpdate("http://localhost:3000/api/reviews/likes", params);
//   updateReviewsInRedux();
// };
