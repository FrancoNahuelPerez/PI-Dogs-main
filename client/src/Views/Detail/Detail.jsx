import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from './Detail.module.css'


export default function Detail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const handleGoBack = () => {
    navigate(-1); // Volver atrás en la navegación
  };
 

  return (
    <div className={styles.container}>
      {dogs.id ? (
        <div className={styles.card}>
          <h2 className={styles.heading}>ID: {dogs.id}</h2>
          <img src={dogs.image} alt={dogs.name} className={styles.image} />
          <h2 className={styles.h2}>Name: {dogs.name}</h2>
          <h3 className={`${styles.info} ${styles.property} ${styles.temperaments}`}>Temperaments:{dogs.Temperaments}</h3>
          <h3 className={`${styles.info} ${styles.property} ${styles.height}`}>
            Height: {dogs.min_height}cm - {dogs.max_height}cm
          </h3>
          <h3 className={`${styles.info} ${styles.property} ${styles.weight}`}>
            Weight: {dogs.min_weight}Kg - {dogs.max_weight}Kg
          </h3>
          <h3 className={`${styles.info} ${styles.property} ${styles.lifeSpan}`}>LifeSpan: {dogs.life_span}</h3>
        </div>
      ) : (
        <p className={styles.alert}>Loading....</p>
      )}
      <button className={styles.goBackButton} onClick={handleGoBack}>Back</button>
    </div>
  );
}
