import './more.css';

function More(props) {

  const style = props.className ? props.className : ''

  return (
    <button className={`more ${style}`}><span className='more__text'>Ещё</span></button>
  )
}

export default More;