import { useParams } from "react-router-dom";


import { ReviewForm } from "./ReviewForm";

export function ReviewCreate() {
  const { id } = useParams();

  return (
    <div className="flex flex-col md:flex-row p-5 md:p-20 md:py-[100px] gap-20">
      <div className="flex flex-col gap-10 lg:gap-20">
        <h1 className="text-6xl lg:text-8xl text-gray-800 font-montserrat font-bold leading-tight ">
          Your<br></br> Opinion <br></br><span className="text-mygreen">We</span><br></br> Listen !{" "}
        </h1>
        <p className="font-roboto text-2xl">Share your experience and join the YOWL community.</p>
      </div>
      <ReviewForm id={id}/>
    </div>
  );
}



