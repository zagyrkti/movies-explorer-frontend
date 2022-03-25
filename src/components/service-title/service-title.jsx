import './service-title.css';

function ServiceTitle(props) {
  return (
      <h2 className='service-title'>{props.children}</h2>
  )
}

export default ServiceTitle;