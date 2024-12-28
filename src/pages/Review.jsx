// import axios from "axios";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// export function Review() {
//   const { id } = useParams();
//   const [rating, setRating] = useState(null);
//   const [title, setTitle] = useState(null);
//   const [content, setContent] = useState(null);
//   const user_id = useSelector((state) => state.user.value?.id);

//   // const date = new Date()
//   // const serializedDate = date.toISOString()
//   // const createdAt = new Date(serializedDate)

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = `http://localhost:3000/api/review/${id}`
//     axios
//     .post(url, {
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

//   return (
//     <div className="flex flex-col h-[700px]">
//       <form
//         onSubmit={handleSubmit}
//         action="/submit-review"
//         method="POST"
//         className="flex flex-col w-8/12 m-auto items-start justify-start  bg-blue-700 p-10 rounded-lg"
//       >
//         <label htmlFor="rating" className="text-white my-2">
//           Evaluate yoour epxerience:
//         </label>
//         <select
//           onChange={(e) => {
//             setRating(e.target.value);
//           }}
//           className="p-2 rounded"
//           id="rating"
//           name="rating"
//           required
//         >
//           <option value="" disabled selected></option>
//           <option value="0">0</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>

//         <label htmlFor="title" className="text-white  my-2">
//           Give a title to your review:
//         </label>
//         <input
//           onChange={(e) => {
//             setTitle(e.target.value);
//           }}
//           className="p-2 rounded w-full"
//           type="text"
//           id="title"
//           name="title"
//           placeholder="Titre de la review"
//           required
//         />

//         <label htmlFor="content" className="text-white  my-2">
//           Describe you experience:
//         </label>
//         <textarea
//           onChange={(e) => {
//             setContent(e.target.value);
//           }}
//           className="p-2 rounded w-full"
//           id="content"
//           name="content"
//           rows="5"
//           placeholder="Votre avis ici..."
//           required
//         ></textarea>

//         <button
//           className="text-white  mt-4 bg-yellow-600 rounded-2xl px-4 py-2 hover:bg-yellow-500 "
//           type="submit"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
