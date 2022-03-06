import './form-input.css';

function FormInput(props) {
  const style = props.className ? props.className : '';
  const { type, placeholder, error, value, name, onChange } = props;
  const constrains = props.constrains

  const inputStyle = error ? 'form-input__input form-input__input_state_error' : 'form-input__input';

  return (
    <label className={`form-input ${style}`}>
      <input
        className={inputStyle} type={type} name={name} placeholder=' '
        value={value}
        onChange={onChange}
        disabled={props.disabled}
        {...constrains}
      />
      <span className='form-input__label-text'>{placeholder}</span>
      <span className='form-input__error'>{error}</span>
    </label>
  )
}

export default FormInput;