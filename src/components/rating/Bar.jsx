export function Bar({number, count}) {
  

    return (
    <div className="flex items-center gap-2 ">
      <span className="block text-sm font-medium ">{number} </span>
      <div className="  w-full bg-gray-100 rounded-full h-3 ">
        <div
          className="bg-orange-300 h-3 rounded-full"
          style={{ width: `${count}%` }}
        ></div>
      </div>
    </div>
  );
}
