
import { useState, useEffect } from "react";
import { SearchCard } from "./search/SearchCard";
import { SearchFilters } from "./search/SearchFilters";
import axios from "axios";
import { SearchBar } from "./search/SearchBar";
import { useSelector } from "react-redux";

export function Search() {
  const [search, setSearch] = useState("");
  const [business, setBusiness] = useState(null);
  const server = useSelector((state)=>state.server.value)

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.trim() === null) {
      setBusiness([]);
      return;
    }
    axios
      .get(`${server}/api/search/${search}`)
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
