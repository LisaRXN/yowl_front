import { useState } from "react";

export function SearchFilters({ business, search, setBusiness }) {
  const [ratingChecked, setRatingChecked] = useState(false);
  const [reviewsChecked, setReviewsChecked] = useState(false);
  // const [lastChecked, setLastChecked] = useState(false);


  const handleRating = async (e) => {
    const checked = e.target.checked;
    setRatingChecked(checked);

    e.preventDefault();
    let url = `http://localhost:3000/api/search/${search}/notation`;

    if (!checked) {
      url = `http://localhost:3000/api/search/${search}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      console.error("erreur");
    }

    const data = await response.json();
    setBusiness(data.results);
  };

  const handleReviews = async (e) => {
    const checked = e.target.checked;
    setReviewsChecked(checked);
    e.preventDefault();
    let url = `http://localhost:3000/api/search/${search}/reviews`;

    const response = await fetch(url);

    if (!checked) {
      url = `http://localhost:3000/api/search/${search}`;
    }

    if (!response.ok) {
      console.error("erreur");
    }

    const data = await response.json();
    setBusiness(data.results);
  };

  // const handleLast = async (e) => {
  //   const checked = e.target.checked;
  //   setLastChecked(checked);
  //   e.preventDefault();
  //   let url = `http://localhost:3000/api/search/${search}/lastreviews`;

  //   const response = await fetch(url);

  //   if (!checked) {
  //     url = `http://localhost:3000/api/search/${search}`;
  //   }

  //   if (!response.ok) {
  //     console.error("erreur");
  //   }

  //   const data = await response.json();
  //   setBusiness(data.results);
  // };



  return (
    <div className="flex flex-col gap-5 h-[300px] w-full rounded-lg  bg-white p-5">
      <span className="font-jost font-bold text-2xl self-center ">Filters</span>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <input
            onChange={handleRating}
            checked={ratingChecked}
            type="checkbox"
            name="rating"
          ></input>
          <label htmlFor="rating">Best rating</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            onChange={handleReviews}
            checked={reviewsChecked}
            type="checkbox"
            name="reviews_number"
          ></input>
          <label htmlFor="reviews_number">Reviews number</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            // onChange={handleLast}
            // checked={lastChecked}
            type="checkbox"
            name="reviews_notation"
          ></input>
          <label htmlFor="reviews_number">More Recent Reviews</label>
        </div>
      </div>
    </div>
  );
}
