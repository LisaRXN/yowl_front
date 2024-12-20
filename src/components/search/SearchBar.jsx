export function SearchBar({search, handleSearchChange }){

    return(
        <div className="flex justify-center p-4">
        <form
          onSubmit={(e) => e.preventDefault()} 
          className="flex items-center border-gray-300 rounded-full shadow-sm md:w-[500px] sm:w-[300px]  "
        >
          <input
            type="text"
            value={search} 
            onChange={handleSearchChange}
            placeholder="Search by name or category..."
            className="px-5 py-5 w-full rounded-l-full text-gray-700 placeholder-gray-400 focus:outline-none "
          />
          <button
            type="submit"
            className="px-4 py-3 bg-myviolet text-white rounded-r-full hover:bg-mygreen focus:outline-none"
          >
            <img className="h-10 object-cover" src='/img/icons/loupe.png'></img>
            </button>
        </form>
      </div>
    )
}