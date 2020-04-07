import React, { useEffect, useState,useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'
import {APIURL} from './supports/UrlApi'
import {Table,CustomInput} from 'reactstrap'


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

  const [addimagefile,setimageadd]=useState({
    addImageFileName:'pilih foto..',
    addImageFile:undefined,
  })

  useEffect(()=>{
    Axios.get(`${APIURL}/foto/foto`)
    .then((res)=>{
      console.log(res.data)
      setdata(res.data)
    })
  },[])


  const onAddImageFileChange=(event)=>{
    // console.log(document.getElementById('addImagePost').files[0])
    console.log(event.target.files[0])
    var file=event.target.files[0]
    if(file){
        setimageadd({...addimagefile,addImageFileName:file.name,addImageFile:event.target.files[0]})
    }else{
        setimageadd({...addimagefile,addImageFileName:'pilih foto',addImageFile:undefined})
    }
}

  const addDataClick=()=>{
    var formdata=new FormData()
    const data={
      caption:state.password,
    }

    var Headers={
      headers:
      {
          'Content-Type':'multipart/form-data',
        //   'Authorization':`Bearer ${token}`
      },
    }
    formdata.append('image',addimagefile.addImageFile)
    formdata.append('data',JSON.stringify(data))
    Axios.post(`${APIURL}/foto/foto`,formdata,Headers)
    .then((res)=>{
      setdata(res.data)
    }).catch((err)=>{
      console.log(err)
      alert(err)
    })
  }
  const deletedataClick=(id)=>{
    Axios.delete(`${APIURL}/users/users/${id}`)
    .then((res)=>{
      setdata(res.data)
    })
  }
  const renderusers=()=>{
    return data.map((val,index)=>{
      return(
        <tr key={index}>
          <td>{index+1}</td>
          <td><img src={APIURL+val.imagefoto} height='200px'/></td>
          <td>{val.caption}</td>
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
            <td><CustomInput id='foto' type='file' label={addimagefile.addImageFileName} onChange={onAddImageFileChange}/></td>
            <td><input type='text' value={state.password} onChange={(e)=>dispatch({type:'password',payload:e.target.value})} placeholder='caption'/></td>
            <td><button className='btn btn-success' onClick={addDataClick}> add</button></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default App;
