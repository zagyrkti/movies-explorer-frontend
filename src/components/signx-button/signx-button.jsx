import './signx-button.css';

function SignxButton(props) {
  const style = props.className ? props.className : ''
  const statusClassValidation = props.isFormValid ? '' : 'signx-button_state_disabled'
  const statusClassDisabled = props.disabled ? 'signx-button_state_disabled' : '';

  return (
      <button type='submit' className={`signx-button ${style} ${statusClassValidation} ${statusClassDisabled}`}
              onClick={props.onClick}
              disabled={props.disabled}>
        <span className='signx-button__text'>{props.children}</span>
      </button>
  )
}

export default SignxButton;