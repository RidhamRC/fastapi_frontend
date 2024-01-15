import { UploadFile } from '@mui/icons-material'
import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


export default function SaveData() {
  const location=useLocation()
  const source_name=location.state.source
  const file_path=location.state.file_path
  const data=location.state.data

  const navigate=useNavigate()
  
  const storeAndGenerateReport=async()=>{
    const body={
        source_name:source_name,
        file_path:file_path
    }
    try {
        const response = await axios.post("http://127.0.0.1:8000/filter_and_save_data", body);
        // Handle success
        console.log('Response:', response.data);
        navigate("/view-report",{state:{source_name:source_name,data:response.data}})

      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
}
    

  
  return (
    <div>
      <h1>Name of Source: <em>{source_name}</em></h1>
      <h1>Number of Fields: <em>{data.number_of_fields}</em></h1>
      <h1>Number of Rules: <em>{data.number_of_rules}</em></h1>
      <h1>Location of the File To be Uploaded: <em>{file_path}</em></h1>
      <Button variant="contained" endIcon={<UploadFile />}
      onClick={
        (e)=>{
            e.preventDefault()
            storeAndGenerateReport()
        }
      }
      >
        UPLOAD DATA
        </Button>
    </div>
  )
}
