import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { SearchCard } from "../components/search/SearchCard";
import { SearchFilters } from "../components/search/SearchFilters";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryFilter } from "../components/categories/CategoryFilter";
import { CategoryTitle } from "../components/categories/CategoryTitle";
import { useSelector } from "react-redux";

export function Category_single() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const server = useSelector((state)=>state.server.value)

  console.log("BUSINES", business);

  const fetchCompanies = () => {
    axios
      .get(`${server}/api/business/category/${id}`)
      .then((response) => {
        if (response.data.results) {
          setBusiness(response.data.results);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCompanies();
  }, [id]);

  return business ? (
    <div className="flex flex-col items-center m-auto">
      <CategoryTitle
        category={business[0].category.toLowerCase()}
        text={business[0].text}
      />

      <div className="flex flex-col md:flex-row md:gap-20 w-full px-5 md:px-20">
        <div className="flex flex-col gap-10 md:w-1/4 py-10 md:py-20 ">
          <CategoryFilter
            search={business[0].category}
            setBusiness={setBusiness}
            id={id}
          />
        </div>

        <div className="md:w-3/4 md:py-20 ">
          <div className=" flex flex-col gap-10 md:gap-20 w-full items-center   ">
            {business.map((b, index) => (
              <SearchCard
                key={index}
                business={b}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
