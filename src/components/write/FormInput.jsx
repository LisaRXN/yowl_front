import { FormLabel } from "./FormLabel";

export function FormInput({
  label,
  type,
  name,
  placeholder,
  value,
  setFunction,
  required,
}) {
  return (
    <>
      <FormLabel label={label} required={required} />

      {type === "textarea" ? (
        <textarea
          onChange={(e) => {
            setFunction(e.target.value);
          }}
          className="p-2 rounded-md shadow-md w-full bg-slate-100 font-light text-md"
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          rows="5"
        ></textarea>
      ) : (
        <input
          type="text"
          onChange={(e) => {
            setFunction(e.target.value);
          }}
          className="p-2 rounded-md shadow-md w-full bg-slate-100 font-light text-md"
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
        ></input>
      )}
    </>
  );
}
