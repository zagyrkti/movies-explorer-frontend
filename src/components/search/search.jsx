import './search.css';

function Search(props) {
  const style = props.className ? props.className : '';


  return (
      <form className={`search ${style}`} onSubmit={props.onSearch} noValidate>
        <input className='search__field' type="text" placeholder='Фильм' name='query' required
               onChange={props.onChange}
               value={props.values.query}
        />
        <div className='search__indicator' />
        <button className='search__button' type="submit" />
      </form>
  )
}

export default Search;