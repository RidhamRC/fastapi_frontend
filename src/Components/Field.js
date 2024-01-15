import { FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';

export default function Field({fieldName,requestBody,setRequestBody}) {
const [dataType, setDataType] = useState(null);
const [minLength,setMinLength]=useState(null)
const [maxLength,setMaxLength]=useState(null)
const [minValue,setMinValue]=useState(null)
const [maxValue,setMaxValue]=useState(null)
const [validators,setValidators]=useState([])
const [ValidatorsList,setValidatorsList]=useState([])

const handleChangeValidator = (event) => {
    const {
      target: { value },
    } = event;
    setValidators(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  
const field=fieldName
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


useEffect(()=>{
    const sendRequestData=()=>{

        let data={}
        if(dataType===null)
    {
        data={
            "field_name": fieldName,
            "data_type": dataType,
            "max_value": null,
            "min_value": null,
            "max_char_length": null,
            "min_char_length": null
        }
        setMaxLength(null)
        setMinLength(null)
        setMaxValue(null)
        setMinValue(null)
        setValidatorsList([])
    }

        if(dataType==="String")
        {
            data={
                "field_name": fieldName,
                "data_type": dataType,
                "max_char_length": maxLength,
                "min_char_length": minLength
            }
            setMaxValue(null)
            setMinValue(null)
            setValidatorsList(['Max Length Validator','Min Length Validator'])
        }

        if(dataType==="Integer")
        {
            data={
                "field_name": fieldName,
                "data_type": dataType,
                "max_value": maxValue,
                "min_value": minValue,
            }
            setMaxLength(null)
         setMinLength(null)
         setValidatorsList(['Max Value Validator','Min Value Validator'])
        }

    
    
        const remainingBody=requestBody.filter(item=>item.field_name!==field)
        setRequestBody([...remainingBody,data])
    }
    
    sendRequestData()
},[dataType,minLength,maxLength,maxValue,minValue])

useEffect(()=>{
console.log("DATA TYPE CHANGED")
setValidators([])
},[dataType])


  const handleChange = (event) => {
    setDataType(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }} style={{display:"flex"}}>
    
    <TextField
          disabled
          id="outlined-disabled"
          label={"Field_name"}
          defaultValue={fieldName}
    />

    <FormControl fullWidth>
   
        <InputLabel id="demo-simple-select-label">Data Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dataType}
          label="Data Type"
          onChange={handleChange}
          className='modal'
          style={{width:"300px"}}
        >
          <MenuItem value={"Integer"}>Integer</MenuItem>
          <MenuItem value={"String"}>String</MenuItem>
        </Select>

      
      </FormControl>
      <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={validators}
          onChange={handleChangeValidator}
          input={<OutlinedInput label="Choose Validators" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          style={{visibility: dataType===null ? 'hidden' : 'visible',minWidth:"700px",position:'relative',left:"-310px"}}
          
        >
          {ValidatorsList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={validators.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      <TextField
          id="outlined"
          label={"max_length"}
          value={maxLength}
          onChange={
            (e)=>{
                if(e.target.value!==""){
                    setMaxLength(parseInt(e.target.value))
                }
                else{
                    setMaxLength(null)
                }
                
            }
          }

          style={{visibility: (dataType==="String"&&validators.includes("Max Length Validator")) ? 'visible' : 'hidden' }}

      />

    <TextField
          id="outlined"
          label={"min_length"}
          value={minLength}
          onChange={
            (e)=>{
                if(e.target.value!==""){
                    setMinLength(parseInt(e.target.value))
                }
                else{
                    setMinLength(null)
                }
                
            }
          }
          style={{visibility: (dataType==="String"&&validators.includes("Min Length Validator")) ? 'visible' : 'hidden' }}
      />

    <TextField
          id="outlined"
          label={"min_value"}
          value={minValue}
          onChange={
            (e)=>{
                if(e.target.value!==""){
                    setMinValue(parseInt(e.target.value))
                }
                else{
                    setMinValue(null)
                }
                
            }
          }
          style={{visibility: (dataType==="Integer"&&validators.includes("Min Value Validator")) ? 'visible' : 'hidden' }}
      />

    <TextField
          id="outlined"
          label={"max_value"}
          value={maxValue}
          onChange={
            (e)=>{
                if(e.target.value!==""){
                    setMaxValue(parseInt(e.target.value))
                }
                else{
                    setMaxValue(null)
                }
                
            }
          }
          style={{visibility: (dataType==="Integer"&&validators.includes("Max Value Validator")) ? 'visible' : 'hidden' }}
      />


    
    </Box>
  )
}
