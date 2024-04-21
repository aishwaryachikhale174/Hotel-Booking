import React, { useState } from 'react'
import "./newhotel.scss"
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from "axios"

const NewHotel = () => {
  const [files, setFiles] = useState("")
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])

  const {data, loading, error} = useFetch("/rooms")
  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}))
  }

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions, 
      (option) => option.value
    );
    setRooms(value)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dakipscpd/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("/hotels", newhotel);
    } catch (err) {console.log(err)}
  };
  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
       <div className='top'>
         <h1>Add New Hotel</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img 
              src={
                files 
                ? URL.createObjectURL(files[0])
                : "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
              }
              alt=""
            />
          </div>
          <div className='right'>
            <form>
              <div className='formInput'>
                <label  htmlFor='file'>
                  image: < DriveFolderUploadIcon className='icon'/>
                </label>
                <input 
                    type="file" 
                    id="file" 
                    multiple
                    style={{display: "none"}}  
                    onChange={e=> setFiles(e.target.files)}>
                </input>
              </div>
              {hotelInputs.map((input)=> (
                 <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input 
                      id={input.id} 
                      onChange={handleChange} 
                      type={input.type} 
                      placeholder={input.placeholder}>
                   </input>
                </div>
              ))}
              <div className='formInput'>
                <lable>Featured</lable>
                <select id="featured">
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className='selectRooms'>
                <lable>Rooms</lable>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading ? loading : data && data.map(room => (
                    <option key = {room._id} value = {room._id}>{room.title}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
       </div>
      </div>
  )
}

export default NewHotel