import React from 'react'
import './Home.css'
import { useState , useEffect} from 'react'
import axios from 'axios'
import {formatDate, DateAfterSixMonth} from '../../TimeFunction/Time'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link} from "react-router-dom";


const Home = () => {
  const [Task , SetTask] = useState({name:'', expired:false ,expiryDate:'',creationDate:formatDate() })
  const [Data , SetData] = useState([])
  const [render, SetRender] = useState (true)


const SubmitForm = async(e)=>{
  e.preventDefault()
  if(Task.name.length>34){
    return toast('MAX 50 CHARACTERS ALLOWED')
  }
  if(Task.name!=='' && Task.expiryDate!==''){
  try {
    await createData()
    await getData()
  }
  catch (err) {
    toast(`Network issue`)
    console.log(err);
  }
}else{
  toast('Please Provide All Fields')
}
}

//yhan id bhejni ha ta k backend p da sken
const DateDifference = (exp, id, status) =>{
    var currentDate = new Date()
    const expiryDate = new Date(exp);
    const differenceMS = expiryDate-currentDate
    const days = Math.ceil((((differenceMS/1000)/60)/60)/24)
    const sec = Math.ceil(Number(differenceMS/1000))
    if(days<10){
      if(status===false){
          const obj = {expired:true}
          axios.patch(`http://localhost:5000/api/v1/tasks/${id}`,obj).catch((err)=>toast(`Network Error`))
      }
    }
    setTimeout(()=>{
      SetRender(!render)
    },1000)
    return days
  }




  // API CALLS


const createData = async () => {
  try {
    await axios.post('http://localhost:5000/api/v1/tasks', Task).then(()=>SetTask({name:'', expired:false ,expiryDate:'',creationDate:formatDate() }))
  }
    catch (err) {
    console.log(err);
  } 
}


const getData = async () => {
    try {
      await axios.get('http://localhost:5000/api/v1/tasks').then((response)=>SetData(response.data.data))
      console.log(Data)
    }
    catch (err) {
    toast(`NetworK issue`)
      console.log(err);
    }
}

const getNotExpiredData = async () => {
  try {
    await axios.get('http://localhost:5000/api/v1/tasks/filter/notexpired').then((response)=>SetData(response.data.data))
    console.log(Data)
  }
  catch (err) {
  toast(`NetworK issue`)
    console.log(err);
  }
}
const getExpiredData = async () => {
  try {
    await axios.get('http://localhost:5000/api/v1/tasks/filter/expired').then((response)=>SetData(response.data.data))
    console.log(Data)
  }
  catch (err) {
  toast(`NetworK issue`)
    console.log(err);
  }
}


const DeleteData = async () => {

  try {
    await axios.delete('http://localhost:5000/api/v1/tasks').then(getData)
  }
    catch (err) {
    toast(`NetworK issue`)
    console.log(err)
  } 
}

const DeleteExpired = async () => {

  try {
    await axios.delete('http://localhost:5000/api/v1/tasks/filter/expired=true').then(getData)
  }
    catch (err) {
    toast(`NetworK issue`)
    console.log(err)
  } 
}

const deleteSingleTask =async(e)=>{
  const id= e.target.id
  try{
    await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`).then(getData)

  }catch(err){
    toast(`NetworK issue`)
      console.log(err);
  }
}







// USE EFFECT

useEffect(()=>{
    getData()
},[])


// COMPONENTS RETURN
  return (
    <div className='Home'>

      <form className='Form' action="">
      <div className='flex-row'>
      <label htmlFor="name">Enter Medicine Date</label>
      <input className='Medicinename' type="text" name='name' id='name' value={Task.name} onChange={(e)=>SetTask({...Task, [e.target.name]:e.target.value})}/>
      </div>
        <div className='flex-row'>
        <label htmlFor="data">Enter Expiry Date</label>
      <input className='DatePicker' min={DateAfterSixMonth()} type="date"  name='expiryDate' id='expiryDate' value={Task.expiryDate} onChange={(e)=>SetTask({...Task, [e.target.name]:e.target.value})}/>
      
      </div>
      <button className='btn' type='submit' onClick={SubmitForm}>Submit</button>
      </form>
      
      <div className='deleteBtnContainer'>
      <button className='btn deleteBtn' onClick={DeleteData}>Delete All</button>
      <button className='btn deleteBtn' onClick={getData}>Get All</button>
      <button className='btn deleteBtn' onClick={getExpiredData}>Get expired</button>
      <button className='btn deleteBtn' onClick={getNotExpiredData}>Get Not Expired</button>
      <button className='btn deleteBtn' onClick={DeleteExpired}>Delete Expired</button>
      </div>

      <div className='TableContainer'>
      <table className='Table'>
        <tr>
          <th>Medicine name</th>
          <th>Creation date</th>
          <th>Expiry date</th>
          <th>Status</th>
          <th>Days Left</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>
        {Data.map((item)=>{
          return (
            <tr style={{backgroundColor:DateDifference(item.expiryDate)<10 &&"red"}} key={item._id}>
            <td>{item.name}</td>
            <td>{item.creationDate}</td>
            <td>{item.expiryDate}</td>
            <td>{DateDifference(item.expiryDate)<10?'Expired':'Active'}</td>
            <td>{DateDifference(item.expiryDate, item._id, item.expired)}</td>
            <td  className='TabelButton' id={item._id} onClick={(e)=>deleteSingleTask(e)}>delete</td>
            <Link to={`/edit/${item._id}`} >Update</Link>
          </tr>
          )
        })}
      </table>
      </div>
      <ToastContainer />
      </div>
  )
}
 
export default Home