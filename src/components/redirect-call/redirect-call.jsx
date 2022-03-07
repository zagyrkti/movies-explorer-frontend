import './redirect-call.css';
import { Link } from 'react-router-dom';

function RedirectCall(props) {
  const style = props.className ? props.className : 0;

  return (
    <div className={`redirect-call ${style}`}>
      <p className='redirect-call__message'>{props.message}</p>
      <Link to={props.toPath} className='redirect-call__link'>{props.toText}</Link>
    </div>
  )
}

export default RedirectCall;