import './modal.css';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("modal");

function Modal(props) {

  return ReactDOM.createPortal(
    <div className='modal'>
      {props.children}
    </div>,
    modalRoot
  );
}

export default Modal;