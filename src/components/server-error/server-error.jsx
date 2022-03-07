import './server-error.css';
import { useEffect, useState } from 'react';

function ServerError(props) {
  const error = props.error ? props.error : '';

  const style = props.className ? props.className : '';

  const [isErrorVisible, setIsErrorVisible] = useState(true);

  function handleCloseClick() {
    setIsErrorVisible(false);
  }

  useEffect(() => {
    props.error ? setIsErrorVisible(true) : setIsErrorVisible(false)
  },[props.error])


  return (
    <div className={`server-error ${style}`}>
      {isErrorVisible &&
        <>
          <p className='server-error__message'>{error}</p>
          <button type='button' className='server-error__close' onClick={handleCloseClick}/>
        </>
      }
    </div>
  )
}

export default ServerError;