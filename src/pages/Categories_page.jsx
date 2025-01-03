import { useEffect, useState } from "react";
import { CategoriesCard } from "../components/categories/CategoriesCard";
import axios from "axios";
import { CategoryCard } from "../components/categories/CategoryCard";
import { useSelector } from "react-redux";

export function Categories_page() {
  const [categories, setCategories] = useState(null);
  const server = useSelector((state)=>state.server.value)

  const fetchCategories = () => {
    axios
      .get(`${server}/api/categories`)
      .then((response) => {
        if (response.data.results) {
          setCategories(response.data.results);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
return (
    categories && (
        <div className="w-full flex p-10 md:py-20 gap-5 flex-wrap items-center justify-center">

        {categories.map( (category,index) =>(
        <CategoryCard key={index} category={category}/>
        ))}
      </div>
    )
  );

}


// return (

//       <div className="flex flex-col p-10">
//         <CategoriesCard />
//     </div>
  
// )





