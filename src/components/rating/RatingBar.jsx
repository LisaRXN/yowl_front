import { Bar } from "./Bar";

export function RatingBar({reviews}) {

  const total = reviews.length
  const count_1 = (reviews.filter(review => review.rating === 1).length/total)*100;
  const count_2 = (reviews.filter(review => review.rating === 2).length/total)*100;
  const count_3 = (reviews.filter(review => review.rating === 3).length/total)*100;
  const count_4 = (reviews.filter(review => review.rating === 4).length/total)*100;
  const count_5 = (reviews.filter(review => review.rating === 5).length/total)*100;

  return (
    <div className="flex flex-col w-1/2 gap-2">

      <Bar number="5" count={count_5}/>
      <Bar number="4" count={count_4}/>
      <Bar number="3" count={count_3}/>
      <Bar number="2" count={count_2}/>
      <Bar number="1" count={count_1}/>

    </div>
  );
}
