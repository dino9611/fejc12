import React, { useEffect, useState,useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'
import {APIURL} from './supports/UrlApi'
import {Table} from 'reactstrap'


const initialstate={
  username:'',
  password:''
}

const reducer=(state=initialstate,action)=>{
  switch(action.type){
    case 'username':
      return {...state,username:action.payload}
    case 'password':
      return {...state,password:action.payload}
    default :
    return state
  }
}



function App() {
  const [state,dispatch]=useReducer(reducer,initialstate)
  const [data,setdata]=useState([])
  useEffect(()=>{
    Axios.get(`${APIURL}/allusers`)
    .then((res)=>{
      console.log(res.data)
      setdata(res.data)
    })
  },[])

  const addDataClick=()=>{
    var obj={
      username:state.username,
      password:state.password
    }
    Axios.post(`${APIURL}/users`,obj)
    .then((res)=>{
      setdata(res.data)
    }).catch((err)=>{
      console.log(err)
      alert(err)
    })
  }
  const deletedataClick=(id)=>{
    Axios.delete(`${APIURL}/users/${id}`)
    .then((res)=>{
      setdata(res.data)
    })
  }
  const renderusers=()=>{
    return data.map((val,index)=>{
      return(
        <tr key={index}>
          <td>{index+1}</td>
          <td>{val.username}</td>
          <td>{val.password}</td>
          <td><button className='btn btn-primary'>edit</button> <button className='btn btn-danger' onClick={()=>deletedataClick(val.id)}>Delete</button></td>
        </tr>
      )
    })
  }
  return (
    <div className='mt-5 mx-5'>
      <Table striped>
        <thead>
          <tr>
            <th>No.</th>
            <th>Username</th>
            <th>Password</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
            {renderusers()}
        </tbody>
        <tfoot>
          <tr>
            <td><input type='text' value={state.username} onChange={(e)=>dispatch({type:'username',payload:e.target.value})} placeholder='username'/></td>
            <td><input type='text' value={state.password} onChange={(e)=>dispatch({type:'password',payload:e.target.value})} placeholder='password'/></td>
            <td><button className='btn btn-success' onClick={addDataClick}> add</button></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default App;
