import "./searchItem.css"
import hotelRoom from "../../Assets/HotelRoom1.jpeg"
import {Link} from "react-router-dom"

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        className="siImg"
        alt="image"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubstitle">
          Studio Apartment with Air Conditioning
        </span>
        <span className="siFeatures">
        {item.desc}
        </span>
        <span className="siCancleOp">Free cancellation</span>
        <span className="siCancleOpSubstitle">
          You can cancle later , so lock in this great price today!
        </span>
      </div>
      <div className="siDetails"> 
      {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to = {`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>   
        </div>
      </div>
    </div>
  )
}

export default SearchItem;