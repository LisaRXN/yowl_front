import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export function ReviewForm({ id }){

  const server = useSelector((state) => state.server.value);
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sendReview, setSendReview]= useState(false)
  const navigate = useNavigate();
  const login = useSelector((state) => state.login.value);
  const user_id = useSelector((state) => state.user?.value?.id || null);

  const date = new Date()
  const serializedDate = date.toISOString()
  const createdAt = new Date(serializedDate)


  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleLogin = () => {
    login ? null : navigate("/auth/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${server}/api/reviews/${id}`
    axios
    .post(url, {
      rating: rating,
      title: title,
      content: content,
      user_id: user_id,
    })
    .then(() => {
      console.log("Review sent successfully!");
      setRating(null);
      setTitle("");
      setContent("");
      setSendReview(true)
    })
    .catch((err) => {
      console.log("Error: " + err.message);
    });
 }


    return(
        <form
        onSubmit={handleSubmit}
        action="/submit-review"
        method="POST"
        className="bg-white font-bold flex flex-col w-full md:w-7/12 m-auto items-start justify-start p-10 lg:p-20 rounded-xl shadow-lg"
      >
        <h2 className="self-center bold text-5xl pb-5 text-myviolet font-montserrat">
          Share Now
        </h2>

        <label htmlFor="rating" className="mt-10 mb-4 text-xl font-jost">
          Evaluate your experience
        </label>

        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={rating}
        />

        <label htmlFor="title" className="mt-10 mb-4 text-xl font-jost">
          Give a title to you review
        </label>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="p-2 rounded-md shadow-md w-full  bg-gray-100 font-light"
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="Titre de la review"
          required
        />

        <label htmlFor="content" className="  mt-10 mb-4  text-xl font-jost ">
          Describe you experience
        </label>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="p-2 rounded-md shadow-md w-full bg-gray-100 font-light"
          id="content"
          name="content"
          rows="5"
          value={content}
          placeholder="Votre avis ici..."
          required
        ></textarea>

        <div className="flex items-center gap-4 mt-10 ">
        <button
          onClick={handleLogin}
          className="text-white text-xl  bg-myviolet rounded-full px-10 py-4 hover:bg-indigo-800 self-end"
          type="submit"
        >
          Send
        </button>
        {sendReview && <span className="text-myviolet">Thank you for sharing your opinion!</span>}
        </div>
      </form>
    )
}