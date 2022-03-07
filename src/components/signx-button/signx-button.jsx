import './signx-button.css';

function SignxButton(props) {
  const style = props.className ? props.className : ''
  const statusClass = props.isFormValid ? '' : 'signx-button_state_disabled'

  return (
    <button className={`signx-button ${style} ${statusClass}`} onClick={props.onClick}>
      <span className='signx-button__text'>{props.children}</span>
    </button>
  )
}

export default SignxButton;