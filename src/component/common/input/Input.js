// const Input = ({ type, name, onChange }) => {
//   return (
//     <>
//       {label && <label htmlFor={name}>{label}</label>}
//       <input type={type} name={name} id={name} value={value} onChange={onChange} />
//     </>
//   );
// };
// export default Input;

//Styles
import "./Input.scss";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  className,
  disabled = false,
  textArea = false,
  error = ""
}) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      {textArea ? (
        <textarea
          disabled={disabled}
          className={`input ${className}`}
          name={name}
          rows={3} // or any number of rows you want as default
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          disabled={disabled}
          className={`input ${className}`}
          type={type}
          name={name}
          value={value}
          onChange={(e)=>onChange(e.target.value)}
        />
      )}
      {error && <span style={{ color: "red" }}>{error}</span>}
    </>
  );
};

export default Input;
