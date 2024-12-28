import ReactStars from "react-rating-stars-component";
import { WriteUpload } from "./WriteUpload";
import { useState } from "react";
import { FormSelect } from "./FormSelect.jsx";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormInput } from "./FormInput.jsx";
import { FormLabel } from "./FormLabel.jsx";

export function WriteForm() {
  const navigate = useNavigate();
  const login = useSelector((state) => state.login.value);
  const user_id = useSelector((state) => state.user?.value?.id || null);

  //Form
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [web, setWeb] = useState(null);
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSucces] = useState(null);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleLogin = () => {
    login ? null : navigate("/auth/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)

    if (
      !name?.trim() ||
      !title?.trim() ||
      !content?.trim()
    ) {
      setError("Fields cannot be empty or contain only spaces!");
      return;
    }
    if(category === null){
      setError("Choose a category!");
      return;
    }

    if (rating === null) {
      setError("You have to rate your experience");
      return;
    }

    const url = `http://localhost:3000/api/business`;
    axios
      .post(url, {
        name: name,
        description: description,
        category_id: category,
        web: web,
        image: image,
        rating: rating,
        title: title,
        content: content,
        user_id: user_id,
      })
      .then((response) => {

        if(response)
        console.log("Review sent successfully!");
        setName("");
        setDescription("");
        setWeb("");
        setImage("");
        setPreview(null);
        setImage(null);
        setRating("");
        setTitle("");
        setContent("");
        setSucces('Thank you for sharing your opinion!')
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
      })
      .catch((err) => {
        console.log("Error: " + err.message, err.response.data);
        setError(err.response.data.error)
      });
  };

  return (
    <>
    {success && 
    <div className="flex flex-col items-center md:p-20 py-[50px] md:py-[100px] gap-10 bg-pink-200 m-auto">
     <span className="text-lg">{success}</span>
     <Link to="/home" className="underline">Back to Home Page</Link>
    </div>
    }
    {success===null  &&
    <form
      onSubmit={handleSubmit}
      action="/submit-review"
      method="POST"
      className="bg-white font-bold flex flex-col w-10/12 m-auto items-start justify-start p-5 md:p-20 rounded-xl shadow-lg  gap-2"
    >
      <h2 className="self-center bold text-4xl md:text-5xl md:pb-5 font-montserrat leading-tight">
        Got something to say? Share your{" "}
        <span className="text-mygreen ">opinion</span> here!
      </h2>

      <FormInput
        label="Give a name to the compagnie, article, video-game..."
        type="text"
        name="name"
        placeholder="Write the name here..."
        value={name}
        setFunction={setName}
        required="true"
      />

      <FormSelect label="Chose a category" setFunction={setCategory} required />

      <FormInput
        label="Give a quick description "
        type="text"
        name="description"
        value={description}
        placeholder="Write your description here..."
        setFunction={setDescription}
      />

      <WriteUpload
        label="Chose a picture to describe"
        image={image}
        setImage={setImage}
        preview={preview}
        setPreview={setPreview}
      />

      <FormInput
        label="Add a website link"
        type="url"
        name="web"
        value={web}
        placeholder="Website link"
        setFunction={setWeb}
      />

      <FormLabel label="Evaluate your experience " required="true" />

      <ReactStars
        count={5}
        value={rating}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />

      <FormInput
        label="Give a title to your experience"
        type="url"
        name="title"
        value={title}
        placeholder="Write the title"
        setFunction={setTitle}
        required="true"
      />

      <FormInput
        label="Describe your experience"
        type="textarea"
        name="content"
        value={content}
        placeholder="Write your review here..."
        setFunction={setContent}
        required="true"
      />
      <div className="flex items-center gap-5 justify-between w-full mt-8">
      <span className="text-red-600 text-xl">{error}</span>
      <button
        onClick={handleLogin}
        className="text-white text-xl bg-myviolet rounded-full px-6 py-3 md:px-10 md:py-4 hover:bg-mygreen self-end"
        type="submit"
      >
        Send
      </button>
      </div>
    </form>
  }
  </>
  );
  
}
