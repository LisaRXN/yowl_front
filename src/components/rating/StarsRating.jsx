import ReactStars from "react-rating-stars-component";
 

export function StarsRating({rating}){

    const ratingChanged = () => {
      };   
      
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={rating}
          
        />
}
