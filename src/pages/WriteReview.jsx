import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { WriteForm } from "../components/write/WriteForm";

export function WriteReview() {
    const navigate = useNavigate();
    const login = useSelector((state) => state.login.value);


  // const { id } = useParams();
  // const [rating, setRating] = useState(null);
  // const [title, setTitle] = useState(null);
  // const [content, setContent] = useState(null);
  // const user_id = useSelector((state) => state.user?.value?.id || null);

  // const date = new Date()
  // const serializedDate = date.toISOString()
  // const createdAt = new Date(serializedDate)

  // const ratingChanged = (newRating) => {
  //   setRating(newRating);
  // };

  const handleLogin = () => {
    login ? null : navigate("/auth/login");
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = `http://localhost:3000/api/business`
//     axios
//     .post(url, {
//       "name" : name,
//       "description" : description,
//       "web" : web,
//       "image" : image,
//       rating: rating,
//       title: title,
//       content: content,
//       user_id: user_id,
//     })
//     .then(() => {
//       console.log("Review sent successfully!");
//       setRating("");
//       setTitle("");
//       setContent("");
//     })
//     .catch((err) => {
//       console.log("Error: " + err.message);
//     });

//  }

  return (
    <div className="flex p-20 py-[100px] gap-20">
      <WriteForm 
 />
      {/* <WriteForm 
      handleSubmit={handleSubmit} 
      ratingChanged={ratingChanged} 
      setTitle={setTitle} 
      setContent={setContent} 
      handleLogin={handleLogin} /> */}

      {/* <div className="flex flex-col gap-20">
        <h1 className="text-8xl text-gray-800 font-montserrat font-bold leading-tight ">
          Your<br></br> Opinion <br></br><span className="text-mygreen">We</span><br></br> Listen !{" "}
        </h1>
        <p className="font-roboto text-2xl">Share your experience and join the YOWL community.</p>
      </div> */}
    </div>
  );
}



