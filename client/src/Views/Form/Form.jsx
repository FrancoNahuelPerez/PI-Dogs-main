import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDogs, getDogs } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Form() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const temperamentos = useSelector((state) => state.temperaments);


  const [form, setForm] = useState({
    name: "",
    max_height: "",
    min_height: "",
    max_weight: "",
    min_weight: "",
    life_span: "",
    temperaments: [],
    image: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const getTemperamentName = (id) => {
    let temperament = temperamentos.filter((temp) => temp.id === id);
    return temperament[0].name;
  };

  const handleDelete = (id) => {
    setForm({
      ...form,
      temperaments: form.temperaments.filter((temp) => temp !== id),
    });
  };

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    const newErrors = validation({
      ...form,
      [event.target.name]: event.target.value,
    });
    setError(newErrors);
  };

  const changeSelectHandler = (event) => {
    const value = Number(event.target.value);
    if (!form.temperaments.includes(value)) {
      setForm({ ...form, temperaments: [...form.temperaments, value] });
    }
  };

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   if (!error.name) {
  //     dispatch(postDogs(form));
  //     dispatch(getDogs());
  //     setForm({
  //       name: "",
  //       max_height: "",
  //       min_height: "",
  //       max_weight: "",
  //       min_weight: "",
  //       life_span: "",
  //       temperaments:[],
  //       image: "",
  //     });
  //     navigate("/home");
  //   } else {
  //     alert("Errors exist");
  //   }
  // };


  const submitHandler = (event) =>{
      event.preventDefault()

      const res = axios.post('http://localhost:3001/dogs', form)

      if(res){
        alert("The dog was created successfully")
        navigate('/home')
      }
      else{
        alert('The dog has not been created')
      }
  }

  const validation = ({
    name,
    max_height,
    max_weight,
    min_weight,
    min_height,
    life_span,
    temperaments,
    image,
  }) => {
    const newError = { ...error };

    if (name) {
      if (!/^[A-Za-z\s]+$/.test(name))
        newError.name = "Writing letters and spaces only";
      else newError.name = "";
    } else {
      if (!name) newError.name = "The name of the dog cannot be null";
    }

    if (max_height) {
      if (!/^[0-9]+$/.test(max_height))
        newError.max_height = "Write only numbers ";
      else if (parseInt(max_height <= 0))
        newError.max_height = "Max-height cannot be less than or equal to 0";
      else newError.max_height = "";
    } else {
      if (!max_height)
        newError.max_height = "The height of the dog cannot be null";
    }

    if (min_height) {
      if (!/^[0-9]+$/.test(min_height))
        newError.min_height = "Write only numbers ";
      else if (parseInt(min_height) >= parseInt(max_height))
        newError.min_height =
          "Min-height cannot be greater than or equal to max-height ";
      else if (parseInt(min_height) <= 0)
        newError.min_height = "Min-height cannot be less than or equal to 0";
      else newError.min_height = "";
    } else {
      if (!min_height)
        newError.min_height = "The height of the dog cannot be null";
    }

    if (max_weight) {
      if (!/^[0-9]+$/.test(max_weight))
        newError.max_weight = "Write only numbers ";
      else if (parseInt(max_weight) <= 0)
        newError.max_weight = "Max-Weight cannot be less than or equal to 0";
      else newError.max_weight = "";
    } else {
      if (!max_weight)
        newError.max_weight = "The weight of the dog cannot be null";
    }

    if (min_weight) {
      if (!/^[0-9]+$/.test(min_weight))
        newError.min_weight = "Write only numbers ";
      else if (parseInt(min_weight) >= parseInt(max_weight))
        newError.min_weight =
          "Min-Weight cannot be greater than or equal to max-width ";
      else if (parseInt(min_weight) <= 0)
        newError.min_weight = "Min-Weight cannot be less than or equal to 0";
      else newError.min_weight = "";
    } else {
      if (!min_weight)
        newError.min_weight = "The weight of the dog cannot be null";
    }

    if (life_span) {
      if (!/^[0-9]+$/.test(life_span))
        newError.life_span = "Write only numbers ";
      else if (parseInt(life_span) <= 0)
        newError.life_span = "The life years cannot be less than or equal to 0";
      else newError.life_span = "";
    } else {
      if (!life_span)
        newError.life_span = "The life years of the dog cannot be null";
    }
    if (temperaments) {
      if (temperaments.length === 0) newError.temperaments = "";
      else {
        newError.temperaments = "";
      }
    }

    if (!image) {
      newError.image = "Image URL cannot be empty";
    } else if (!/^https?:\/\/\S+$/.test(image)) {
      newError.image = "Invalid image URL";
    } else if (image.length > 300) {
      newError.image = "Image URL cannot exceed 300 characters";
    }

    return newError;
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <h1>Create your Dog</h1>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
            placeholder="Insert Name..."
          ></input>
          {error.name && <span>{error.name}</span>}
          <hr></hr>
          <label htmlFor="max_height">Max-height:</label>
          <input
            id="max_height"
            type="text"
            value={form.max_height}
            onChange={changeHandler}
            name="max_height"
            placeholder="Insert Max-height..."
          ></input>
          {error.max_height && <span>{error.max_height}</span>}
          <hr></hr>
          <label htmlFor="min_height">Min-height:</label>
          <input
            id="min_height"
            type="text"
            value={form.min_height}
            onChange={changeHandler}
            name="min_height"
            placeholder="Insert Min-height..."
          ></input>
          {error.min_height && <span>{error.min_height}</span>}
          <hr></hr>
          <label htmlFor="max_weight">Max-weight</label>
          <input
            id="max_weight"
            type="text"
            value={form.max_weight}
            onChange={changeHandler}
            name="max_weight"
            placeholder="Insert Max-weight..."
          ></input>
          {error.max_weight && <span>{error.max_weight}</span>}
          <hr></hr>
          <label htmlFor="min_weight">Min-weight</label>
          <input
            id="min_weight"
            type="text"
            value={form.min_weight}
            onChange={changeHandler}
            name="min_weight"
            placeholder="Insert Min-weight..."
          ></input>
          {error.min_weight && <span>{error.min_weight}</span>}
          <hr></hr>
          <label htmlFor="life_span">Life-span</label>
          <input
            id="life_span"
            type="text"
            value={form.life_span}
            onChange={changeHandler}
            name="life_span"
            placeholder="Inssert Life-span..."
          ></input>
          {error.life_span && <span>{error.life_span}</span>}
          <hr></hr>
          <label htmlFor="temperaments">Temperaments:</label>
          <select
            name="temperaments"
            onChange={changeSelectHandler}
            > 
            {temperamentos?.map((temp) => (
              <option value={temp.id} key={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
          {error.temperaments && <span>{error.temperaments}</span>}
          <hr></hr>
          <label>Image:</label>
          <input
            type="text"
            value={form.image}
            onChange={changeHandler}
            name="image"
            placeholder="Inset URL..."
          ></input>
          {error.image && <span>{error.image}</span>}
          <hr></hr>
          <img src={form.image} alt={form.name}></img>
          <button
            disabled={
              !form.name ||
              !form.image ||
              !form.life_span ||
              !form.max_height ||
              !form.min_height ||
              !form.max_weight ||
              !form.min_weight ||
              form.temperaments.length === 0
            }
          >
            Submit
          </button>
        </div>
      </form>
      <h3>Temperaments:</h3>
      {form.temperaments.map((element) => {
        return (
          <div key={element}>
            <p>{getTemperamentName(element)}</p>
            <button onClick={() => handleDelete(element)}>X</button>
          </div>
        );
      })}
    </div>
  );
}
