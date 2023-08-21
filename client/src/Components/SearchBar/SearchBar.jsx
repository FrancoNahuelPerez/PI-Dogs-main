import { getDogsByName } from '../../Redux/actions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

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
    <div>
      <input
      type='search'
      value={dogs}
      onChange={handleInput}
      placeholder='Search...'>        
      </input>
      <button onClick={handleSearch}>SEARCH</button>
      {error && <p>{error}</p>}
    </div>
  )
}
