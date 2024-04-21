import React from 'react'
import "./featuredProperities.css"
import useFetch from '../../hooks/useFetch'

const FeaturedProperities = () => {

  const {data, loading, error} = useFetch(
    "/api/hotels?featured=true&limit=4"
  );
  return (
    <div className='fp'>
      {loading ? ("Loading" 
         ) : (
       <>  
         {data? (data.map(item => (

          <div className='fpItem' key={item._id}>
              <img 
                src={item.photos[0]} 
                className='fpImg' 
                alt="hotelroom"
                height="200" width="310"
              />
              <span className='fpName'>{item.name}</span>
              <span className='fpCity'>{item.city}</span>
              <span className='fpPrice'>starting from ${item.cheapestPrice}</span>
             { item.rating && <div className='fpRating'>
                  <button>{item.rating}</button>
                  <span>Excellent</span>
              </div>}
           </div> 
          ))) : <div>Unable to load data at this movement</div>}
        </>
        )}
    </div>
  )
}

export default FeaturedProperities