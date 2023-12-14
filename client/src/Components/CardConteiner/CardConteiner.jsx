import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Pagination from "../Paginado/Pagination";
import style from './CardConteiner.module.css'

export default function CardConteiner() {
  const dogs = useSelector((state) => state.dogs);
  const cardPerPages = 8;
  const totalPages = Math.ceil(dogs.length / cardPerPages);
  console.log('dogs', dogs)

  const [currentPage, setCurrentPage] = useState(0);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setCurrentPage(0);
    setReset(false)
  }, [dogs, reset]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const renderCards = () => {
    const startIndex = currentPage * cardPerPages;
    const endIndex = startIndex + cardPerPages;

    const currentDogs = Array.isArray(dogs)
      ? dogs.slice(startIndex, endIndex)
      : [];

    if (currentDogs.length === 0) {
      return (
        <p className={style.formError}>
          No Dogs were found with the specified search term, please check the
          name and try again.
        </p>
      );
    }

    return (
      <>
        <div>
          {currentDogs.slice(0, 4).map((dogss) => (
            <Card
              life_span={dogss.life_span}
              id={dogss?.id}
              key={dogss?.id}
              name={dogss?.name}
              image={dogss?.image}
              maxPeso={dogss?.max_weight}
              minPeso={dogss?.min_weight}
              Temperaments={dogss?.Temperaments}
              fromApi={dogss.fromApi ? true : false}
            />
          ))}
        </div>
        <div>
          {currentDogs.slice(4, 8).map((dogss) => (
            <Card
              id={dogss?.id}
              key={dogss?.id}
              name={dogss?.name}
              image={dogss?.image}
              maxPeso={dogss?.max_weight}
              minPeso={dogss?.min_weight}
              Temperaments={dogss?.Temperaments}
              fromApi={dogss.fromApi ? true : false}
            />
          ))}
        </div>
      </>
    );
  };
  return(
    <div className={style.cardContainer}>
      {renderCards()}
      <div className={style.cardColumn}>
        <Pagination
        className={style.paginationContainer}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}/>
      </div>
    </div>
  )
}
