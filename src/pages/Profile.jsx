import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterInput } from "../components/auth/register/RegisterInput";
import { RegisterUpload } from "../components/auth/register/RegisterUpload";
import { LoginInputMail } from "../components/auth/login/LoginInputMail";
import axios from "axios";
import { setUser } from "../store/userSlice";
import { UserReviewsCard } from "../components/profile/userReviewsCard";

export function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const server = useSelector((state) => state.server.value);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [country, setCountry] = useState(user.country);
  const [updated, setUpdated] = useState(false);
  const [reviews, setReviews] = useState([]);

  const user_name =
    user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
  const id = user.id;

  let user_avatar;
  if (user.avatar.startsWith("http")) {
    user_avatar = user.avatar;
  } else {
    user_avatar = server + user.avatar;
  }
  console.log("AVA", user_avatar)
  const [avatar, setAvatar] = useState(user_avatar || "/img/users/avatar.png");
  const [preview, setPreview] = useState(user_avatar || "/img/users/avatar.png");

  const fetchUser = () => {
    axios
      .get(`http://localhost:3000/api/users/${user.id}`)
      .then((response) => {
        console.log(response.data.results);
        dispatch(setUser(response.data.results[0]));
      })
      .catch((err) => console.log(err));
  };

  const fetchReviews = () => {
    axios
      .get(`http://localhost:3000/api/users/reviews/${user.id}`)
      .then((response) => {
        console.log(response.data.results);
        setReviews(response.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:3000/api/users/update", {
        firstname,
        lastname,
        country,
        avatar: user.avatar,
        email,
        id,
      })
      .then(() => {
        console.log("User updated successfully !");
        setUpdated(true);
        fetchUser();
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  return (
    <div className="flex flex-col gap-10 items-start p-10 py-20 justify-start min-h-screen bg-slate-600">
      <form
        onSubmit={handleSubmit}
        action="/submit-review"
        method="POST"
        className="w-2/3 max-w-[700px] flex flex-col items-start gap-4"
      >
        <div className="py-4">
          <h2 className="self-center font-montserrat font-bold text-4xl text-slate-100 ">{`Hello ${user_name}`}</h2>
          <p className=" flex gap-2 font-light text-sm text-slate-200 py-2">
            Update and customize your profile here!
          </p>
        </div>

        <RegisterUpload
          avatar={avatar}
          setAvatar={setAvatar}
          preview={preview}
          setPreview={setPreview}
        />

        <RegisterInput
          input={firstname}
          setInput={setFirstname}
          name="Firstname"
          placeholder={user.firstname}
        />

        <RegisterInput
          input={lastname}
          setInput={setLastname}
          name="Lastname"
          placeholder={user.lastname}
        />

        <RegisterInput
          input={country}
          setInput={setCountry}
          name="Country"
          placeholder={user.country}
        />

        <LoginInputMail email={email} setEmail={setEmail} />

        <div className="flex items-center justify-between w-full mt-5">
          <button
            className="text-white bg-myviolet w-[100px] rounded-xl px-4 py-2 hover:bg-mygreen "
            type="submit"
          >
            Send
          </button>
          {updated && (
            <span className="text-mygreen">
              Your profile has been updtated!
            </span>
          )}
        </div>
      </form>

      <div className="pt-5">
        <h2 className="self-center font-montserrat font-bold text-4xl text-slate-100 ">
          Your activity
        </h2>
        <p className=" flex gap-2 font-light text-sm text-slate-200 py-2">
          See all the opinions you shared!
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-4 flex-between overflow-y-scroll w-3/4">
        {reviews?.map((review, index) => (
          <UserReviewsCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
}
