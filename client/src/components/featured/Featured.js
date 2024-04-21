import "./featured.css"
import waterfall from "../../Assets/Waterfall.jpg"
import Hotel from "../../Assets/Hotel.jpg"
import image from "../../Assets/images.jpeg"
import useFetch from "../../hooks/useFetch"

const Featured = () => {

    const {data, loading, error} = useFetch("/api/hotels/countByCity?cities=Mumbai,pune,Delhi")
    // console.log(data)
  return (
    <div className="featured">
        { loading ? (
            "Loading please wait"
        ) : (
        <>
            <div className="featuredItem">
                <img 
                    src={waterfall}
                    height="250px" width="310px" 
                    alt="hotelImage" 
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Mumbai</h1>
                    <h2>{data[0]} properities</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img
                    src={Hotel}
                    height="250px" width="310px" 
                    alt="hotelImage"
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Pune</h1>
                    <h2>{data[1]}properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img 
                    src={image} 
                    height="250px" width="310px"
                    alt="hotelImage" 
                    className="featuredImg" 
                />
                <div className="featuredTitles">
                    <h1>Delhi</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div> 
        </>)}
    </div>
  )
}

export default Featured