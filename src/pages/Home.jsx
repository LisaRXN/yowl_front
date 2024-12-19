import { useSelector } from "react-redux";
import { Search } from "../components/Search";
import { Categories_page } from "./Categories_page";
import { useEffect, useState } from "react";

export function Home() {
  const token = useSelector((state) => state.user.token);
  console.log(token);

  return (
    <div className="flex flex-col items-center justify-center p-10 w-full">
      <img className="h-[200px] w-auto" src="/img/cat1.png" alt="" />
      <h1 className="text-7xl font-bold font-montserrat p-10">
        Your Opinion <span className="text-mygreen">We</span> Love!
      </h1>

      <p className="text-2xl p-5 mb-5">
        Share your opinions and join the Community
      </p>


      <Search></Search>

      <Categories_page />
    </div>
  );
}
