import React from 'react'
import './Edit.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import {formatDate, DateAfterSixMonth} from '../../TimeFunction/Time'
import {useState, useEffect} from 'react'
import { Link} from "react-router-dom";






const Edit = () => {
  const [SingleTask, SetSingleTask] = useState({name:'',expiryDate:''})
  const [Data, SetData] = useState({})
  let href = window.location.pathname
  let id = href.substring(href.lastIndexOf('/')+1)

  //API CALLS
  const getSingleTask = async () => {
    try {
      await axios.get(`http://localhost:5000/api/v1/tasks/${id}`).then((response)=>SetData(response.data.data))
    }
    catch (err) {
    toast(`NetworK issue`)
      console.log(err);
    }
}

  const UpdateTask =async(e)=>{
    e.preventDefault()
    if(SingleTask.name!=='' && SingleTask.expiryDate!==''){
      try{
        await axios.patch(`http://localhost:5000/api/v1/tasks/${id}`,SingleTask).then(()=>SetSingleTask({name:'',expiryDate:''}))
      }catch(err){
        toast(`NetworK issue`)
          console.log(err);
      }
    }else{
      toast('Please Provide All Fields')
    }
  }

  //USEEFFECT
  useEffect(()=>{
    getSingleTask()
  },[SingleTask])


  return (
    <div>
      <div>
      <div>
      <p>Task Name</p>
      <p>{Data.name}</p>
      </div>
      <div>
      <p>Task Expiry Date</p>
      <p>{Data.expiryDate}</p>
      </div>
      </div>

    <form action="">
    <div className='flex-row'>
      <label htmlFor="name">Enter Medicine Date</label>
      <input className='Medicinename' type="text" name='name' id='name' value={SingleTask.name} onChange={(e)=>SetSingleTask({...SingleTask, [e.target.name]:e.target.value})}/>
      </div>
        <div className='flex-row'>
        <label htmlFor="data">Enter Expiry Date</label>
      <input className='DatePicker' min={DateAfterSixMonth()} type="date"  name='expiryDate' id='expiryDate' value={SingleTask.expiryDate} onChange={(e)=>SetSingleTask({...SingleTask, [e.target.name]:e.target.value})}/>
      <button type='submit' onClick={(e)=>UpdateTask(e)}>Update</button>
      </div>
    </form>
    
    <Link to='/' >GO bACK</Link>

      <ToastContainer />

    </div>
  )
}

export default Edit