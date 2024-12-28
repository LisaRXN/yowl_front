import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../../store/reviewsSlice";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReviewCardUser } from "./ReviewCardUser";
import { ReviewCardLikes } from "./ReviewCardLikes";
import { ReviewComment } from "./ReviewComment";
import { CommentCreate } from "../comments/CommentCreate";
import { formatDate } from "../../utils/formatDate";

export function ReviewsCard({ business_id, review }) {
  const [comment, setComment] = useState(null);
  const [comments, setComments] = useState([]);
  const [comments_count, setComments_count] = useState(0);
  const [hasComment, setHascomment] = useState(false);
  const [openComment, setOpencomment] = useState();
  const [likes, setLikes] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [dislikes, setDislikes] = useState("");
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isLikeCreated, setIsLikeCreated] = useState(false);
  const user_id = useSelector((state) => state.user.value?.id);
  const user = useSelector((state) => state.user.value);
  const review_id = review.review_id;
  const token = useSelector((state) => state.user?.token);
  const dispatch = useDispatch()


  const updateReviewsInRedux = () => {
    axios
      .get(`http://localhost:3000/api/reviews/${business_id}`)
      .then((response) => dispatch(setReviews(response.data.results)))
      .catch((err) => console.log(err));
  };


  const isLikeInDatabase = () => {
    if(user_id){
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
    }
  };

  const reviewIsLiked = () => {
    if(user_id){
    axios
      .get(
        `http://localhost:3000/api/likes/get_likes_user/${user_id}/${review_id}`
      )
      .then((response) => {
        if (response.data.results[0]?.is_liked) {
          setHasLiked(response.data.results[0].is_liked);
        }
      })
      .catch((err) => console.log(err));
    }
  };


  const reviewIsCommented = () => {
    if(user_id){
    axios
      .get(
        `http://localhost:3000/api/comments/get_comment_user_review/${user_id}/${review_id}`
      )
      .then((response) => {
        if (response.data.results.length > 0) {
          setHascomment(true);
        }
      })
      .catch((err) => console.log(err));
    }
  };


  const fetchComments = () => {
    axios
    .get(`http://localhost:3000/api/comments/get_comments_review/${review_id}`)
    .then((response) => {
      if (response.data.results && response.data.results.length > 0) {
        setComments(response.data.results);
        setComments_count(response.data.results.length)
      }else{
        console.log("Aucun commentaire trouvé.");
      }
    })
    .catch((err) => console.log(err));

  }

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
    fetchComments();
    reviewIsCommented()
  }, [business_id, user_id]);


  const updateLike = () => {
    const newLikeStatus = !hasLiked;
    const url = isLikeCreated
      ? `http://localhost:3000/api/likes/update`
      : "http://localhost:3000/api/likes/create";

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
        setIsLikeCreated(true);
      })
      .catch((err) => {
        console.error("Erreur lors de la création du like:", err);
        setHasLiked(!newLikeStatus);
        setLikes((prev) => (newLikeStatus ? prev - 1 : prev + 1));
      });
  };

  const updateDislike = () => {
    const newDislikeStatus = !hasDisliked;

    if (newDislikeStatus) {
      setHasLiked(false);
      setLikes(0);
    }

    setHasDisliked(newDislikeStatus);
    setDislikes((prev) => (newDislikeStatus ? prev + 1 : prev - 1));

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
      })
      .catch((err) => {
        console.log(err);
        setHasDisliked(!newDislikeStatus);
        setDislikes((prev) => (newDislikeStatus ? prev - 1 : prev + 1));
      });
  };

  return (
    <div className="flex p-5 border-solid border-t-2 md:w-3/4   ">
      <div className="flex w-full">
        
        <div className="flex flex-col md:flex-row flex-row gap-5 md:gap-10 w-full">
          <ReviewCardUser review={review} />

          <div className="flex flex-col gap-2 w-2/3">
            <div className="flex gap-4 items-center">
              <ReactStars
                key = {review_id}
                edit={false}
                count={5}
                size={14}
                activeColor="#ffaa00"
                value={review.rating}
              />
              <span className="font-extralight text-sm">
                {formatDate(review?.createdAt)}
              </span>
            </div>
            <span className="text-gray-800 font-semibold">{review?.title} </span>
            <span className="text-gray-600 font-light">{review?.content}</span>

            {token &&<ReviewCardLikes
              handleComment={() => setOpencomment(!openComment)}
              handleLike={updateLike}
              handleDislike={updateDislike}
              hasLiked={hasLiked}
              like={likes}
              dislike={dislikes}
              comments_count={comments_count}
              hasComment={hasComment}
            />
            }

            {openComment && (
              <div className="flex flex-col gap-5 ">
                {comments?.map((item, index) => (
                  <ReviewComment key={index} comment={item} />
                ))}

                <CommentCreate hasComment={hasComment} comment={comment} user={user} review_id={review_id} fetchComments={fetchComments} setHascomment={setHascomment} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
