import React from "react";
import CardConteiner from "../../Components/CardConteiner/CardConteiner";
import { useDispatch, useSelector, connect } from "react-redux";
import { useEffect } from "react";
import {
  getDogs,
  filterClean,
  filterTemperaments,
  filterr,
  filtrarApi,
  filtrarBd,
  pesoAscendente,
  pesoDescendente,
  dogsAscendente,
  dogsDescendente,
  getTemperaments,
} from "../../Redux/actions";

function Home({filterr,dogsAscendente,dogsDescendente,filterTemperaments,pesoAscendente,pesoDescendente}) {
  const dispatch = useDispatch();

  const allTemperaments = useSelector((state) => state.temperaments);

  const dogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
   
  }, [dispatch]);

  const handleReset = () => {
    dispatch(filterClean);
  };

  const handleSortAZChange = (event) => {
    if (event.target.value === "asc") {
      dogsAscendente();
    } else if (event.target.value === "des") {
      dogsDescendente();
    }
  };

  const handleSortWeight = (event) => {
    if (event.target.value === "asc") {
      pesoAscendente();
    } else if (event.target.value === "des") {
      pesoDescendente();
    }
  };

  const handleSourceChange = (creator) => {
    if (creator === "API") {
      dispatch(filtrarApi());
    } else if (creator === "Database") {
      dispatch(filtrarBd());
    } else {
      dispatch(filterr("none"));
    }
  };

  const handleTemperamentsChange = (event) => {
    filterTemperaments(event.target.value === "" ? "all" : event.target.value);
  };

  return (
    <>
      <div>
        <form>
          <div>
            <label>Ordenar A-Z:</label>
            <select onChange={handleSortAZChange}>
              <option value="">Select</option>
              <option value="asc">A-Z Ascending</option>
              <option value="des">Z-A Descending</option>
            </select>
          </div>
          <div>
            <label>Ordenar Peso:</label>
            <select onChange={handleSortWeight}>
              <option value="">Select</option>
              <option value="asc">100-0 Descending</option>
              <option value="des">0-100 Ascending</option>
            </select>
          </div>
          <div>
            <label>Filtrar Por:</label>
            <select onChange={(event) => handleSourceChange(event.target.value)}>
              <option value='none'>All Dogs</option>
              <option value= 'API'>Api Dogs</option>
              <option value= 'Database'>Database Dogs</option>
            </select>
          </div>
          <div>
            <label>Filtrar Temperaments:</label>
            <select onChange={handleTemperamentsChange}>
              <option value="">All Temperaments</option>
              {allTemperaments?.map((temp) =>(
                <option key={temp.id} value={temp.name}>
                  {temp.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={handleReset}>Reset Filters</button>
          </div>
        </form>     
        <CardConteiner />
      </div>
    </>
  );
}


const mapStateToProps = (state) =>{
  return{
    temperaments: state.temperaments
  }
}

const mapDispatchToProps = {
  filterr,
  dogsAscendente,
  dogsDescendente,
  pesoAscendente,
  pesoDescendente,
  filterTemperaments
}




export default connect(mapStateToProps, mapDispatchToProps)(Home)