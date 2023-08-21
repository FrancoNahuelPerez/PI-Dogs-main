import React from 'react'
import { Link } from 'react-router-dom'

export default function Card(props) {
  return (
    <div>
      <Link to={`/detail/${props.id}`}>
        <h2>{props.name}</h2>
      </Link>
      <Link to={`/detail/${props.id}`}>
        <img src={props.image} alt={props.name}></img>
      </Link>
      <h4>{props.Temperaments}</h4>
      <h3>
        {props.minPeso}Kg - {props.maxPeso}Kg
      </h3>
    </div>
  )
}
