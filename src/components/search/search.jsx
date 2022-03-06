import './search.css';

function Search(props) {
  const style = props.className ? props.className : '';

  return (
    <form className={`search ${style}`}>
      <input className='search__field' type="text" placeholder='Фильм' required/>
      <div className='search__indicator' />
      <button className='search__button' type="submit" />
    </form>
  )
}

export default Search;