import React from 'react'

export default function ImagemSobreNos({imagem, alt}) {
  return (
    <>
     <div className="img">
            <img src={imagem} alt={alt} />
    </div>
    </>
  )
}
