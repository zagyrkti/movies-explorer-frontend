import './link-button.css';

function LinkButton(props) {
  const link = props.link;
  const style = props.className ? props.className : '';
  const bgColor = props.priority === 'high' ? 'link-button_priority_high' : 'link-button_priority_normal'

  return (
    <a className={`link-button ${bgColor} ${style}`} href={link} rel='noreferrer noopener' target='_blank'>
      <span className='link-button__text'>{props.children}</span>
    </a>
  )
}

export default LinkButton;