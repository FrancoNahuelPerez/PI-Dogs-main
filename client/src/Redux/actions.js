import axios from "axios";
import {
  GET_DOGS,
  GET_DOGS_ID,
  GET_TEMPERAMENTS,
  GET_DOGS_NAME,
  POST_DOGS,
  ASC_AZ_DOGS,
  DESC_ZA_DOGS,
  ASC_WEIGHT,
  DESC_WEIGHT,
  FILTER_SOURCE,
  FILTRAR_API,
  FILTRAR_BD,
  FILTRAR_TEMPERAMENTS,
  LIMPIAR_FILTROS
} from "./actionTypes";

export const getDogs = () => {
  return async function (dispatch) {
    try {
      const api = await axios.get("http://localhost:3001/dogs");
      const dogi = api.data;
      dispatch({ type: GET_DOGS, payload: dogi });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getDogsByName = (name) => {
  return async function (dispatch) {
    const res = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    const dogByName = res.data;
    dispatch({ type: GET_DOGS_NAME, payload: dogByName });
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/temperaments`);
      const temp = res.data;
      dispatch({ type: GET_TEMPERAMENTS, payload: temp });
    } catch (error) {
      console.log(error.message);
    }
  };
};


export const getDogsbyId = (id) => {
  return async function (dispatch) {
    const res = axios.get(`http://localhost:3001/dogs/${id}`);
    const dogsId = res.data;
    return dispatch({ type: GET_DOGS_ID, payload: dogsId });
  };
};

export const postDogs = (props) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/dogs", {
        ...props,
      });
      alert("the dog breed was created successfully");
      dispatch({ type: POST_DOGS, payload: response.data });
      return response;
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("The dog has not been created.");
      }
    }
  };
};

export const dogsAscendente = () =>{
  return function (dispatch){
    dispatch({type:ASC_AZ_DOGS})
  }
}

export const dogsDescendente = () =>{
  return function(dispatch){
    dispatch({type:DESC_ZA_DOGS})
  }
}

export const pesoAscendente = () =>{
  return function(dispatch){
    dispatch({type:ASC_WEIGHT})
  }
}

export const pesoDescendente = () =>{
  return function(dispatch){
    dispatch({type: DESC_WEIGHT})
  }
}

export const filtrarBd = () =>{
  return{
    type:FILTRAR_BD
  }
}

export const filtrarApi = () =>{
  return{
    type:FILTRAR_API
  }
}

export const filterClean = () =>{
  return{
    type:LIMPIAR_FILTROS
  }
}

export const filterr = () =>{
  return{
    type:FILTER_SOURCE
  }
}

export const filterTemperaments = (payload) =>{
  return{
    type:FILTRAR_TEMPERAMENTS,
    payload,
  }
}