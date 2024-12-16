import { FormLabel } from "./FormLabel";

export function FormSelect({ label, required, setFunction, value }) {
  console.log();
  return (
    <div className="flex flex-col items-start w-full">
      <FormLabel label={label} required={required} setCategory />

      <select
        onChange={(e) => {
          setFunction(parseInt(e.target.value));
        }}
        id="theme"
        value={value}
        name="theme"
        className="bg-slate-100 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-500 font-light shadow-md"
      >
        <option value="1">Sport</option>
        <option value="2">Video-game</option>
        <option value="3">Music</option>
        <option value="4">Food</option>
        <option value="5">Clothes</option>
        <option value="6">Clubbing & Parties</option>
        <option value="7">Nature</option>
        <option value="8">Science</option>
        <option value="9">Travel</option>
      </select>
    </div>
  );
}
