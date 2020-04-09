import React, { Component } from 'react';
import Axios from 'axios'
import { APIURL } from '../supports/UrlApi';

class Register extends Component {
    state = {
        username:'',
        password:'',
        email:''    
    }

    onRegisinput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    onRegister=()=>{
        var data={
            username:this.state.username,
            password:this.state.password,
            email:this.state.email
        }
        Axios.post(`${APIURL}/users/register`,data)
        .then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() { 
        return (
            <div className='d-flex justify-content-center align-items-center' style={{height:'80vh'}}>
                <div>
                    <h2>Register</h2>
                    <h5>Username :</h5>
                    <input type="text" placeholder='username' value={this.state.username} onChange={this.onRegisinput} name='username'/>
                    <h5>Email :</h5>
                    <input type="text" placeholder='Email' value={this.state.email} onChange={this.onRegisinput} name='email'/>
                    <h5>Password :</h5>
                    <input type="password" placeholder='password' value={this.state.password} onChange={this.onRegisinput} name='password'/>
                    <br/>
                    <button onClick={this.onRegister}>
                        REGISTER
                    </button>
                </div>
            </div>
          );
    }
}
 
export default Register;