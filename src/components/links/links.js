import './links.css';

function Links(props) {
  const style = props.className ? props.className : '';

  return (
    <div className={`links ${style}`}>
      <a className='links__link' href="https://practicum.yandex.ru/" rel='noreferrer noopener'
         target='_blank'>Яндекс.Практикум</a>
      <a className='links__link' href="https://github.com/zagyrkti" rel='noreferrer noopener' target='_blank'>Github</a>
      <a className='links__link' href="https://www.facebook.com/" rel='noreferrer noopener' target='_blank'>Facebook</a>
    </div>
  )
}

export default Links;