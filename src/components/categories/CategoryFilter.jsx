import { useState } from "react";
import { FilterInput } from "../search/FilterInput";
import axios from "axios";

export function CategoryFilter({ setBusiness, id, search}) {
  const [ratingChecked, setRatingChecked] = useState(false);
  const [reviewsChecked, setReviewsChecked] = useState(false);

   console.log("SEARCH", search)

  const handleRating = (e)=> {
    const checked = e.target.checked;
    setRatingChecked(checked);
    e.preventDefault();

    let url = `http://localhost:3000/api/search/${search}/notation`;

    if (!checked) {
      url = `http://localhost:3000/api/business/category/${id}`;
    }

    axios
    .get(url)
    .then((response) => {
      if (response.data.results.length > 0) {
        setBusiness(response.data.results);
      }
    })
    .catch((err) => console.log(err));
  }



  const handleReviews = (e)=> {
    const checked = e.target.checked;
    setReviewsChecked(checked);
    e.preventDefault();

    let url = `http://localhost:3000/api/search/${search}/reviews`;

    if (!checked) {
      url = `http://localhost:3000/api/business/category/${id}`;
    }

    axios
    .get(url)
    .then((response) => {
      if (response.data.results.length > 0) {
        setBusiness(response.data.results);
      }
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="flex flex-col gap-5 md:h-[280px] w-full rounded-sm shadow-md">
      <span className="font-montserrat font-bold text-white text-xl self-center  bg-slate-700 w-full p-4 rounded-t-sm ">Filters</span>

      <div className="flex flex-col gap-4  p-4">

        <FilterInput 
        handleFilter={handleRating}
        filterChecked={ratingChecked}
        label="Best ratings"
        name='rating' 
        />

        <FilterInput 
        handleFilter={handleReviews}
        filterChecked={reviewsChecked}
        label="Number of opinions"
        name='reviews_number' 
        />

        {/* <FilterInput 
        handleFunction={handleLast}
        functionChecked={lastChecked}
        label="More Recent Reviews"
        name='reviews_number' 
        /> */}

      </div>
    </div>
  );
}
