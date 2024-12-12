export function BarFilter({ number, count, handleReviews}) {
  return (
    <div className="flex items-center gap-2 ">
      <input
        name={number}
        onChange={(e) => handleReviews(e)}
        type="checkbox"
      ></input>
      <span className="block text-sm font-medium ">{number} </span>
      <div className="  w-full bg-gray-100 rounded-full h-3 mx-2 ">
        <div
          className="bg-orange-300 h-3 rounded-full"
          style={{ width: `${count}%` }}
        ></div>
      </div>
      <span className="text-sm text-gray-500 font-light">{count}%</span>
    </div>
  );
}
