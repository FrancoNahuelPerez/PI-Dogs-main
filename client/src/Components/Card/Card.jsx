import React from 'react'
import { Link } from 'react-router-dom'
import style from './Card.module.css'


export default function Card({id, image, name, minPeso, maxPeso, Temperaments}) {

  const renderTemperaments = () => {
    if (typeof Temperaments === 'string') {
      // Si Temperaments es un string, renderizarlo en un h4
      return <h4>{Temperaments}</h4>;
    } else if (Array.isArray(Temperaments)) {
      // Si Temperaments es un arreglo, mapearlo y renderizar los nombres en h4
      return Temperaments.map((temperament, index) => (
        <h4 key={index}>{temperament.name}</h4>
      ));
    } else {
      // Si Temperaments no es ni string ni arreglo, no renderizar nada
      return null;
    }
  };

  return (
    <div className={style.card}>
      <Link to={`/detail/${id}`}>
        <h2>{name}</h2>
      </Link>
      <Link to={`/detail/${id}`}>
        <img src={image} alt={name}></img>
      </Link>
      {renderTemperaments()}
      <h3>
        {minPeso}Kg - {maxPeso}Kg
      </h3>
    </div>
  )
}
