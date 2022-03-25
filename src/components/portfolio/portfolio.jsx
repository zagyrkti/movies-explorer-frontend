import './portfolio.css';

function Portfolio() {
  return (
      <div className='portfolio'>
        <h4 className='portfolio__title'>Портфолио</h4>
        <a className='portfolio__link' href="https://github.com/zagyrkti/react-mesto-api-full" rel='noreferrer noopener'
           target='_blank'>SPA</a>
        <a className='portfolio__link' href="https://zagyrkti.github.io/russian-travel/" rel='noreferrer noopener'
           target='_blank'>Адаптивный сайт</a>
        <a className='portfolio__link' href="https://zagyrkti.github.io/how-to-learn/" rel='noreferrer noopener'
           target='_blank'>Статичный сайт</a>
      </div>
  )
}

export default Portfolio;