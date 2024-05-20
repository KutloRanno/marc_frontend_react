import { useSports } from "../contexts/SportsContext.jsx";

function Search() {
  const { setSearchTerm } = useSports();
  function handleSearch(e) {
    setSearchTerm(() => e.target.value);
  }
  return (
    <div>
      <input
        type={"text"}
        onChange={handleSearch}
        placeholder={"Search sports..."}
      />
    </div>
  );
}

export default Search;
