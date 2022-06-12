const searchItem = (props) => {
    const search = props.search;
    const setSearch = props.setSearch;

  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search'>Search</label>
        <input
            id='search'
            type='text'
            role='searchbox'
            placeholder='Search Items'
            value={search}
            onChange={(e) => setSearch(e.target.value)} //one source of truth
        />
    </form>
  )
}

export default searchItem