import { FC } from "react";

interface FormRowProps {
  type: string;
  name: string;
  value: string;
  handleChange: Function;
  labelText: string;
}

const FormRow: FC<FormRowProps> = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        className="form-input"
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  );
};

export default FormRow;
