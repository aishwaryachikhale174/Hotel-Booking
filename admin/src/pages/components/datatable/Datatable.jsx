import React, { useEffect, useState } from 'react'
import "./datatable.scss"
import { DataGrid} from '@mui/x-data-grid';
import { userColumns, userRows } from '../../../datatablesource';
import {Link, useLocation} from "react-router-dom"
import useFetch from "../../../hooks/useFetch"
import axios from "axios"



const Datatable = ({columns}) => {

  const location = useLocation();
  const path = location.pathname.split("/")[1]

  const [list, setList] = useState("")
 const {data, loading, error} = useFetch(`/${path}`)
 

 useEffect(()=> {
  setList(data)
 },[data])

  const handleDelete = async(id) => {
    try{
      await axios.delete(`/${path}/${id}`)
      setList(list.filter((item)=> item._id !== id))
    }catch(err) {
    }
   
  }

  const actionColumn = [
    {field: "action",
     headerName: "Action",
     width: 200,
    renderCell:(params)=>{
    return(
      <div className='cellAction'>
        <Link to ="/users/test" style={{textDecoration: "none"}}>
        <div className='viewButton'>View</div>
        </Link>
        <div className='deleteButton' onClick={()=>handleDelete(params.row._id)}>Delete</div>   
      </div>
    )
  }}]
  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        Add New User
        <Link to ={`/${path}/new`} style={{textDecoration: "none"}} className='link'>
          Add New
        </Link>
      </div>
      <DataGrid
        className='datagrid'
         rows={data}
         columns={columns.concat(actionColumn)}
         initialState={{
           pagination: {
             paginationModel: { page: 0, pageSize: 5 },
           },
         }}
         pageSizeOptions={[5, 10]}
         checkboxSelection
         getRowId={(row)=>row._id}
      />
    </div>

  )
}

export default Datatable