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
  const server = useSelector((state) => state.server.value);
  const user = useSelector((state) => state.user.value);
  const id = user?.id;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [preview, setPreview] = useState(null);

  const user_name = firstname?.charAt(0).toUpperCase() +firstname.slice(1);

  let user_avatar;
  if (avatar?.startsWith("http")) {
    user_avatar = avatar;
  } else if(avatar?.startsWith("/images") ){
    user_avatar = server + avatar;
  } 

  
  useEffect(() => {
    if (user) {
    fetchUser();
    fetchReviews();
    }
  }, []);


  const fetchUser = () => {
    axios
      .get(`${server}/api/users/${user?.id}`)
      .then((response) => {
        console.log("USER RES", response.data.results);
        dispatch(setUser(response.data.results[0]));
        setFirstname( response.data.results[0].firstname)
        setLastname( response.data.results[0].lastname)
        setEmail(response.data.results[0].email )
        setCountry(response.data.results[0].country )
        setAvatar(response.data.results[0].avatar )
      })
      .catch((err) => console.log(err));
  };


  const fetchReviews = () => {
    axios
      .get(`${server}/api/users/reviews/${user.id}`)
      .then((response) => {
        console.log(response.data.results);
        setReviews(response.data.results);
      })
      .catch((err) => console.log(err));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put(`${server}/api/users/update`, {
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

    <div className="flex flex-col gap-10 items-start p-10 md:py-20 justify-start min-h-screen bg-slate-600">
      <form
        onSubmit={handleSubmit}
        action="/submit-review"
        method="POST"
        className="md:w-2/3 max-w-[700px] flex flex-col items-start gap-4"
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
          preview={user_avatar}
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
          <UserReviewsCard key={index} review={review} fetchReviews={fetchReviews} />
        ))}
        
      </div>
    </div>

  );
}
