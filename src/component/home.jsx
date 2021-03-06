import React, { useEffect, useState,useReducer } from 'react';

import Axios from 'axios'
import {APIURL} from '../supports/UrlApi'
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



function Home() {
  const [state,dispatch]=useReducer(reducer,initialstate)
  const [data,setdata]=useState([])
  const [indedit,setinedit]=useState(-1)
  const [editcaption,seteditcaption]=useState('')
  const [addimagefile,setimageadd]=useState({
    addImageFileName:'pilih foto..',
    addImageFile:undefined,
  })
  const [editimagefile,setimageedit]=useState({
    editImageFileName:'pilih edit foto..',
    editImageFile:undefined,
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




  const oneditImageFileChange=(event)=>{
    // console.log(document.getElementById('addImagePost').files[0])
    console.log(event.target.files[0])
    var file=event.target.files[0]
    if(file){
        setimageedit({...editimagefile,editImageFileName:file.name,editImageFile:event.target.files[0]})
    }else{
        setimageedit({...editimagefile,editImageFileName:'pilih edit foto',editImageFile:undefined})
    }
  }

  const onSavedataClick=()=>{
    var formdata=new FormData()
    const obj={
      caption:editcaption,
    }
    var id=data[indedit].id
    // console.log(id)
    var Headers={
      headers:
      {
          'Content-Type':'multipart/form-data',
          
      },
    }
    formdata.append('image',editimagefile.editImageFile)
    formdata.append('data',JSON.stringify(obj))//json strigify itu mengubah object menjadi json
    Axios.put(`${APIURL}/foto/foto/${id}`,formdata,Headers)
    .then((res)=>{
      setinedit(-1)
      setdata(res.data)
    }).catch((err)=>{
      console.log(err)
      alert(err)
    })
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
    formdata.append('data',JSON.stringify(data))//json strigify itu mengubah object menjadi json
    Axios.post(`${APIURL}/foto/foto/`,formdata,Headers)
    .then((res)=>{
      setdata(res.data)
    }).catch((err)=>{
      console.log(err)
      alert(err)
    })
  }
  const deletedataClick=(id)=>{
    Axios.delete(`${APIURL}/foto/foto/${id}`)
    .then((res)=>{
      setdata(res.data)
    })
  }
  const renderusers=()=>{
    return data.map((val,index)=>{
      if(index===indedit){
        return(
        <tr key={index}>
          <td>{index+1}</td>
          <td><CustomInput id='foto' type='file' label={editimagefile.editImageFileName} onChange={oneditImageFileChange}/></td>
          <td><input type='text' value={editcaption} onChange={(e)=>seteditcaption(e.target.value)} placeholder=' edit caption' /></td>
          <td><button className='btn btn-primary' onClick={onSavedataClick}>Save</button> <button className='btn btn-danger' onClick={()=>setinedit(-1)} >Cancel</button></td>
        </tr>
        )
      }
      return(
        <tr key={index}>
          <td>{index+1}</td>
          <td><img alt={index} src={APIURL+val.imagefoto} height='200px'/></td>
          <td>{val.caption}</td>
          <td><button className='btn btn-primary' onClick={()=>setinedit(index)}>edit</button> <button className='btn btn-danger' onClick={()=>deletedataClick(val.id)}>Delete</button></td>
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

export default Home;
