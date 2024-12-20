export function CategoryTitle({ category, text }) {

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);


  return (
    <div className="flex items-center gap-5 p-10 bg-slate-700  w-full text-slate-100 ">
      <img
        src={`/img/category/${category}.png`}
        alt=""
        className="h-[120px] w-[120px] md:h-[200px] md:w-[200px]"
      />
      <div className="flex flex-col items-start">
        <span className="font-bold font-poppins upp text-4xl md:text-6xl py-4">{categoryTitle}</span>
        <span className=" font-light font-poppins  text-slate-300 text-xl ">
          {text}
        </span>
      </div>
    </div>
  );
}
