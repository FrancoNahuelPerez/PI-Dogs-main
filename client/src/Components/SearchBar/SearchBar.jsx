import { getDogsByName } from '../../Redux/actions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import styles from "./SearchBar.module.css"


export default function SearchBar() {
  const dispatch = useDispatch()
  const [dogs, setDogs] = useState("")
  const [error, setError] = useState('')


  const handleInput = (event) =>{
    setDogs(event.target.value)
  }
  const handleSearch = (event)=>{
    if(dogs === ""){
      setError("Enter a search term")
    }
    dispatch(getDogsByName(dogs));
    setError('')
  }

  return (
    <div className={styles["search-bar-container"]}>
      <input
        type='search'
        value={dogs}
        onChange={handleInput}
        placeholder='Search...'
        className={styles["search-input"]}
      />
      <button onClick={handleSearch} className={styles["search-button"]}>SEARCH</button>
      {error && <p className={styles["error-message"]}>{error}</p>}
    </div>
  );
}
