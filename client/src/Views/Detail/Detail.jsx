import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getDogsbyId } from "../../Redux/actions";

export default function Detail() {
  const dispatch = useDispatch()

  const { id } = useParams();

  const [dogs, setDogs] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3001/dogs/${id}`).then(({data}) => {
      if(data.id){
        setDogs(data)
      }else{
        window.alert('not found details dogs')
      }
    })
    return setDogs({})
  }, [id]);

 

  return (
    <div>
      <img src={dogs?.image} alt={dogs?.name}></img>
      <h2>Name:{dogs?.name}</h2>
      <h2>ID:{dogs?.id}</h2>
      <h3>Temperaments: {dogs?.Temperaments}</h3>
      <h3>
        Height: {dogs?.min_height}cm - {dogs?.max_height}cm
      </h3>
      <h3>
        Weight: {dogs?.min_weight}Kg - {dogs?.max_weight}Kg
      </h3>
      <h3>LifeSpan: {dogs?.life_span}</h3>
    </div>
  );
}
