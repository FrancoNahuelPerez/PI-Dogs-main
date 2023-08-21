import React from 'react'
import CardConteiner from '../../Components/CardConteiner/CardConteiner'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getDogs } from '../../Redux/actions'
export default function Home() {
const dispatch = useDispatch()

 useEffect(() =>{
  dispatch(getDogs())
 },[dispatch])
  return (
    <div>
      <h1>home</h1>
      <CardConteiner/>
    </div>
  )
}
