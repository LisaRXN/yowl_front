import ReactStars from "react-rating-stars-component";


export function ReviewForm({handleSubmit, ratingChanged, setTitle, setContent, handleLogin }){

    return(
        <form
        onSubmit={handleSubmit}
        action="/submit-review"
        method="POST"
        className="bg-white font-bold flex flex-col w-7/12 m-auto items-start justify-start py-20 px-20 rounded-xl shadow-lg"
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
          placeholder="Votre avis ici..."
          required
        ></textarea>

        <button
          onClick={handleLogin}
          className="text-white text-xl mt-10  bg-myviolet rounded-full px-10 py-4 hover:bg-indigo-800 self-end"
          type="submit"
        >
          Send
        </button>
      </form>
    )
}