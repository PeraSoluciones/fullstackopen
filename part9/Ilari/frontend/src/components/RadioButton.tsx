interface Radio {
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const RadioButton = (props: Radio) => {
  return (
    <div style={{ display: 'inline' }}>
      <label htmlFor={props.value}>{props.value}</label>
      <input
        type='radio'
        id={props.value}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default RadioButton;
