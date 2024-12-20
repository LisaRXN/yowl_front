import { Link } from "react-router-dom";

export function CategoryCard({category}){

  const categoryName = category.name.charAt(0).toUpperCase() + category.name.slice(1);


  const id=parseInt(category.id)
  const colors = ["myviolet2", "mygreen2", "slate-200", "mypink2", "myblue2"]
  let color
  if(id <= 5){
    color = colors[id-1];
  }else if( id > 5 && id <= 10){
    color = colors[id-5];
  }else if( id > 10 && id <= 15){
    color = colors[id-10];
  }

    return(
    <Link to={`/category/${category.id}`} >
    <div className={`flex items-center gap-5 p-10 bg-${color} rounded-2xl min-w-[350px] cursor-pointer`}>
      <img
        src={`/img/category/${category.name}.png`}
        alt=""
        className=" h-[100px] w-[100px] md:h-[150px] md:w-[150px] "
      />
      <div className="flex flex-col items-start">
        <span className="font-bold font-poppins text-3xl md:text-4xl py-2 ">
          {categoryName}
        </span>
        <span className=" font-light font-poppins text-slate-600 ">
        {category.text}
        </span>
      </div>
    </div>
  </Link>
)

}