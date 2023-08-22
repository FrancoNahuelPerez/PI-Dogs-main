import {
  GET_DOGS,
  GET_DOGS_ID,
  GET_DOGS_NAME,
  GET_TEMPERAMENTS,
  POST_DOGS,
  ASC_AZ_DOGS,
  DESC_ZA_DOGS,
  ASC_WEIGHT,
  DESC_WEIGHT,
  FILTER_SOURCE,
  FILTRAR_API,
  FILTRAR_BD,
  FILTRAR_TEMPERAMENTS,
  LIMPIAR_FILTROS,
} from "./actionTypes";

const initialState = {
  dogs: [],
  dogsDetail: {},
  temperaments: [],
  allDogs: [],
  filters: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_DOGS_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_DOGS_ID:
      return {
        ...state,
        dogsDetail: action.payload,
      };
    case POST_DOGS:
      return {
        ...state,
        allDogs: [...state.dogs, action.payload],
      };
    case ASC_AZ_DOGS:
      const ordenarDogsAscendente = [...state.dogs].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return {
        ...state,
        dogs: ordenarDogsAscendente,
      };
    case DESC_ZA_DOGS:
      const ordenarDogsDescendente = [...state.dogs].sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      return {
        ...state,
        dogs: ordenarDogsDescendente,
      };
    case ASC_WEIGHT:
      const ordenarPesoAscendente = [...state.dogs].sort(
        (a, b) => b.max_weight - a.max_weight
      );
      return {
        ...state,
        dogs: ordenarPesoAscendente,
      };
    case DESC_WEIGHT:
      const ordenarPesoDescendente = [...state.dogs].sort(
        (a, b) => a.max_weight - b.max_weight
      );
      return {
        ...state,
        dogs: ordenarPesoDescendente,
      };
    case FILTRAR_BD:
      const filtrarBd = state.allDogs.filter(
        (dogi) => typeof dogi.id === "string"
      );
      return {
        ...state,
        dogs: filtrarBd,
      };
    case FILTRAR_API:
      const filtratApi = state.allDogs.filter(
        (dogi) => typeof dogi.id === "number"
      );
      return {
        ...state,
        dogs: filtratApi,
      };
    case FILTER_SOURCE:
      return {
        ...state,
        dogs: state.allDogs,
      };
    case FILTRAR_TEMPERAMENTS:
      if (action.payload === "all") {
        return {
          ...state,
          dogs: state.allDogs,
        };
      }
      const filterTemperaments = state.allDogs.filter((dogi) =>
        dogi.Temperaments?.includes(action.payload)
      );
      if (filterTemperaments.length === 0) {
        return {
          ...state,
          dogs: [],
        };
      }
      return {
        ...state,
        dogs: filterTemperaments,
      };
    case LIMPIAR_FILTROS:
      return {
        ...state,
        dogs: state.allDogs,
        filters: {},
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
