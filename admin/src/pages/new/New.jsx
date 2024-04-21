import React, { useState } from 'react'
import "./new.scss"
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from "axios"

const New = ({input, title}) => {
  const [file, setFile] = useState("")
  const [info, setInfo] = useState({})

  const handleChange = e=> {
    setInfo(prev=>({...prev,[e.target.id] : e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try{
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dakipscpd/image/upload", data)
      const {url} = uploadRes.data

      const newUser = {
        ...info,
        img: url
      }
      
      console.log(newUser)

      const axiosInstance = axios.create({withCredentials: true, headers: {
        "Content-type": "application/JSON",
        }})
     await axiosInstance.post('/auth/register', newUser)
    
   
    }catch(err){
      console.log(err)
    }
    
  }

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
       <div className='top'>
         <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img 
              src={
                file 
                ? URL.createObjectURL(file)
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
                <input type="file" id="file" style={{display: "none"}}  onChange={e=> setFile(e.target.files[0])}></input>
              </div>
              {input.map((input)=> (
                 <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                      onChange={handleChange}
                      type={input.type} 
                      placeholder={input.placeholder}
                      id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
       </div>
      </div>
  )
}

export default New