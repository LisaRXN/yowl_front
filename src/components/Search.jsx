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
          <div className="flex gap-20 w-full py-10 px-5 ">
            <div className="w-1/4 py-20">
              <SearchFilters
                business={business}
                setBusiness={setBusiness}
                search={search}
              />
            </div>

            <div className="w-3/4 py-20">
              <SearchCard business={business} />
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
