
import { useState, useEffect } from "react";
import { SearchCard } from "./search/SearchCard";
import { SearchFilters } from "./search/SearchFilters";
import axios from "axios";
import { SearchBar } from "./search/SearchBar";

export function Search() {
  const [search, setSearch] = useState("");
  const [business, setBusiness] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.trim() === null) {
      setBusiness([]);
      return;
    }
    axios
      .get(`http://localhost:3000/api/search/${search}`)
      .then((response) => setBusiness(response.data.results))
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <>
      <SearchBar search={search} handleSearchChange={handleSearchChange} />

      {business && (
        <>
          <div className=" flex flex-col md:flex-row md:gap-20 w-full md:py-10 md:px-5  ">
            
            <div className=" w-full md:w-1/4 py-20">
              <SearchFilters
                business={business}
                setBusiness={setBusiness}
                search={search}
              />
            </div>

            <div className=" w-full md:w-3/4 md:py-20">

            <div className=" flex flex-col gap-20 w-full items-center ">

            {business.map((b, index) => (
              <SearchCard key={index} business={b}/>
            ))}

            </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// useEffect(() => {
//   const fetchBusiness = async () => {
//     if (search.trim() === null) {
//       setBusiness([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/search/${search}`
//       );

//       if (!response.ok) {
//         console.error("Erreur lors de la requête");
//         return;
//       }
//       const data = await response.json();
//       setBusiness(data.results);

//     } catch (error) {
//       console.error("Erreur réseau :", error);
//     }
//   };

//   fetchBusiness();
// }, [search]);
