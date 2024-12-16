
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function CategoriesCard() {
  // const [categories, setCategories] = useState([])

  // useEffect(() => {

  //   axios
  //     .get(`http://localhost:3000/api/categories`)
  //     .then((response) => setCategories(response.data.results))
  //     .catch((err) => console.log(err));
  // }, []);



  return (
    
    <div className="flex py-20 px-10 gap-5 flex-wrap items-center justify-center">
      
      {/* card */}
      <Link to="/category/1">
        <div className="flex items-center gap-5 p-10 bg-myviolet2 rounded-2xl min-w-[350px] cursor-pointer ">
          <img
            src="/img/category/sport.png"
            alt=""
            className="h-[150px] w-[150px]"
          />
          <div className="flex flex-col items-start">
            <span className="font-bold font-poppins upp text-4xl py-2">
              Sports
            </span>
            <span className=" font-light font-poppins text-slate-500 ">
              Move your body!
            </span>
          </div>
        </div>
      </Link>

      {/* card */}
      <Link to="/category/2">
      <div className="flex items-center gap-5 p-10 bg-mygreen2 rounded-2xl min-w-[350px] cursor-pointer">
        <img
          src="/img/category/game2.png"
          alt=""
          className="h-[170px] w-[170px]"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold font-poppins upp text-4xl py-2">
            Video Game
          </span>
          <span className=" font-light font-poppins text-slate-500 ">
            Game on, stress off.
          </span>
        </div>
      </div>
      </Link>

      {/* card */}
      <Link to="/category/3">
      <div className="flex items-center gap-5 p-10 bg-slate-200 rounded-2xl min-w-[350px] cursor-pointer">
        <img
          src="/img/category/music.png"
          alt=""
          className="h-[150px] w-[150px]"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold font-poppins upp text-4xl py-2 ">
            Music
          </span>
          <span className=" font-light font-poppins text-slate-500 max-w-[150px] ">
            I don{"'"}t need therapy, I just need music.
          </span>
        </div>
      </div>
      </Link>
      {/* card */}
      <Link to="/category/4">
      <div className="flex items-center gap-5 p-10 bg-mypink2 rounded-2xl min-w-[350px] cursor-pointer">
        <img
          src="/img/category/food1.png"
          alt=""
          className="h-[150px] w-[150px]"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold font-poppins upp text-4xl py-2 ">
            Food
          </span>
          <span className=" font-light font-poppins text-slate-500 max-w-[150px] ">
            Good food, good mood!
          </span>
        </div>
      </div>
      </Link>
      {/* card */}
      <Link to="/category/5">
      <div className="flex items-center gap-5 p-10 bg-myblue2 rounded-2xl min-w-[350px] cursor-pointer">
        <img
          src="/img/category/clothe2.png"
          alt=""
          className="h-[150px] w-[150px]"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold font-poppins upp text-4xl py-2">
            Clothes
          </span>
          <span className=" font-light font-poppins text-slate-500 ">
            Wear it like you mean it.
          </span>
        </div>
      </div>
      </Link>
      {/* card */}
      <Link to="/category/6">
      <div className="flex items-center gap-5 p-10 bg-myviolet2 rounded-2xl min-w-[350px] cursor-pointer">
        <img
          src="/img/category/club.png"
          alt=""
          className="h-[150px] w-[150px]"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold font-poppins upp text-4xl py-2 max-w-[200px]">
            Clubbing & Parties
          </span>
          <span className=" font-light font-poppins text-slate-500 max-w-[200px] ">
            Life is a party, and I’m the confetti.
          </span>
        </div>
      </div>
      </Link>
      {/* card */}
      <Link to="/category/7">
      <div className="flex items-center gap-5 p-10 bg-mygreen2 rounded-2xl min-w-[350px] cursor-pointer">
        <img
          src="/img/category/nature2.png"
          alt=""
          className="h-[140px] w-[140px]"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold font-poppins upp text-4xl py-2 max-w-[200px]">
            Nature
          </span>
          <span className=" font-light font-poppins text-slate-500 max-w-[200px] ">
            Leaf me alone.
          </span>
        </div>
      </div>
      </Link>
      {/* card */}
      <Link to="/category/8">
      <div className="flex items-center gap-5 p-10 bg-slate-200 rounded-2xl min-w-[350px] cursor-pointer">
        <img
          src="/img/category/science.png"
          alt=""
          className="h-[150px] w-[150px]"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold font-poppins upp text-4xl py-2 max-w-[200px]">
            Science
          </span>
          <span className=" font-light font-poppins text-slate-500 max-w-[200px] ">
            Think like a proton: always positive!
          </span>
        </div>
      </div>
      </Link>
      {/* card */}
      <Link to="/category/9">
      <div className="flex items-center gap-5 p-10 bg-mypink2 rounded-2xl min-w-[350px] cursor-pointer">
        <img
          src="/img/category/travel.png"
          alt=""
          className="h-[140px] w-[140px]"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold font-poppins upp text-4xl py-2 max-w-[200px]">
            Travel
          </span>
          <span className=" font-light font-poppins text-slate-500 max-w-[200px] ">
            Exploring today, dreaming of tomorrow.
          </span>
        </div>
      </div>
      </Link>

    </div>
  );
}
