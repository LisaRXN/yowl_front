import { useState } from "react";
import { FilterInput } from "./FilterInput";
import axios from "axios";

export function SearchFilters({ business, search, setBusiness }) {
  const [ratingChecked, setRatingChecked] = useState(false);
  const [reviewsChecked, setReviewsChecked] = useState(false);
  // const [lastChecked, setLastChecked] = useState(false);



  const handleRating = (e)=> {
    const checked = e.target.checked;
    setRatingChecked(checked);
    e.preventDefault();

    let url = `http://localhost:3000/api/search/${search}/notation`;

    if (!checked) {
      url = `http://localhost:3000/api/search/${search}`;
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
      url = `http://localhost:3000/api/search/${search}`;
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


  

  // const handleReviews2 = async (e) => {
  //   console.log("click")

  //   const checked = e.target.checked;
  //   setReviewsChecked(checked);
  //   e.preventDefault();
  //   let url = `http://localhost:3000/api/search/${search}/reviews`;

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
    <div className="flex flex-col gap-5 h-[200px] md:h-[300px] w-full rounded-sm shadow-md">
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
