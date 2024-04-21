import React from 'react'
import "./property.css"
import img1 from "../../Assets/img1.jpeg"
import img2 from "../../Assets/img2.jpeg"
import img3 from "../../Assets/img3.jpeg"
import img4 from "../../Assets/img4.jpeg"
import useFetch from '../../hooks/useFetch'

const PropertyList = () => {
    const {data, loading, error} = useFetch(
        "api/hotel/countByType"
      
    )
    console.log(data)

    const images = [
        img1,
        img2,
        img3,
        img4
    ]
  return (
    <div className='pList'>
         { loading ? (
            "Loading please wait"
        ) : (
        <>
            { data && images.map((img, i) => (   
                 <div className='pListItem' key={i}>
                    <img
                        src={img} 
                        height = "250px" 
                        width= "310px"
                        alt="property image" 
                    />
                    <div className='pListTitles'>
                        <h1>{data[i]?.type}</h1>
                        <h2>{data[i]?.count} {data[i]?.type}</h2>
                    </div>
                </div>
            ))}
        </>
        )}
    </div>
  )
}

export default PropertyList