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

  // const handleLogin = () => {
  //   login ? null : navigate("/auth/login");
  // };


  return (
    <div className="flex md:p-20 py-[50px] md:py-[100px] gap-20">
      <WriteForm 
 />
    </div>
  );
}



