import './stage.css'

function Stage(props) {

  const style = props.className ? props.className : '';
  return (
      <div className={`stage ${style}`}>
        <span className='stage__text'>{props.children}</span>
      </div>
  )
}

export default Stage