import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ComponenteDos() {
    const navigate = useNavigate()
  return (
    <div>
    <h1>Soy el componente numero DOS</h1>
      <button onClick={()=>navigate('/')}>Back to Home</button>
    </div>
  )
}
