import React from 'react'
import './Ranking.css'

export default function Ranking(props) {
  return (
   <div className="ranking">
      <div className="ranking-container">
         <h1 className="ranking-titulo">{props.titulo}</h1>
        <div className='ranking-wrapper'>{props.children}</div>
      </div>
    </div>
  )
}
