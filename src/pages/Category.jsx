import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { SearchCard } from "../components/search/SearchCard";

export function Category() {
  const { id } = useParams();
  const url = `http://localhost:3000/api/business/category/${id}`;
  const { data, loading, error, setData } = useFetch(url);

  return data ? (
    <div className="flex flex-col items-center m-auto p-20">
      <h1 className="text-4xl font-bold font-montserrat max-w-2/3 pb-20">YOWL{"'"}s Talk on {data ? data[0].category : ''}</h1>
      <div className=" flex flex-col w-2/3">
        <SearchCard business={data} />
      </div>
    </div>
  ) : (
    <div>{loading}...</div>
  );
}
