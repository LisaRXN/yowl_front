export function FormLabel({ label, required }) {
  return (
    <label htmlFor="content" className="  mt-8 mb-2 text-xl font-jost ">
      {label}
      <span className="text-red-600">{required ? " *" : ""}</span>
    </label>
  );
}
