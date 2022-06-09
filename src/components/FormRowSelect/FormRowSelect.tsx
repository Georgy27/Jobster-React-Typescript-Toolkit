interface FormRowSelectProps {
  labelText?: string;
  name: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  list: string[];
}

const FormRowSelect: React.FC<FormRowSelectProps> = ({
  labelText,
  name,
  value,
  handleChange,
  list,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(e) => handleChange(e)}
        className="form-select"
      >
        {list.map((statusValue, index) => {
          return (
            <option key={index} value={statusValue}>
              {statusValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
