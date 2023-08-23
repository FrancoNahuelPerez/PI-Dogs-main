import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Pagination from "../Paginado/Pagination";


export default function CardConteiner() {
  const dogs = useSelector((state) => state.dogs);
  const cardPerPages = 10;
  const totalPages = Math.ceil(dogs.length / cardPerPages);

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
        <p>
          No recipes were found with the specified search term, please check the
          name and try again.
        </p>
      );
    }

    return (
      <>
        <div>
          {currentDogs.slice(0, 5).map((dogss) => (
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
        <div>
          {currentDogs.slice(5, 10).map((dogss) => (
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
    <div>
      {renderCards()}
      <div>
        <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}/>
      </div>
    </div>
  )
}
