export function FilterInput({handleFilter, filterChecked, label,name }) {
  return (
    <div className="flex items-center gap-2">
      <input
        onChange={handleFilter}
        checked={filterChecked}
        type="checkbox"
        name={name}
        id={name}
        style={{ display: "none" }}
      ></input>
      <label htmlFor={name} className="flex items-center gap-3 font-jost text-lg">
        <img
          className="w-[25px] h-[25px]"
          src={
            filterChecked
              ? "/img/icons/fleche_r_green.png"
              : "/img/icons/fleche_r.png"
          }
        ></img>
        {label}
      </label>
    </div>
  );
}
