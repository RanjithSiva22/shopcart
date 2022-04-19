import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {registerapi} from './services/register';
import showNotification from '../utils/showNotification';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }
    inputHandler = (e) => {
        // console.log(e.target.name);
        switch (e.target.name) {
            case 'name':
                this.setState({ name: e.target.value });
                break;
            case 'email':
                this.setState({ email: e.target.value });
                break;

            case 'password':
                this.setState({ password: e.target.value });
                break;
            default:
                break;
        }
    }

    submitHandler = async(e) => {
        e.preventDefault();
        console.log('working');
        let res=await registerapi(this.state);
        console.log(res);
        if(res) {
            showNotification("Account created successfully","success");
            //  this.props.history.push('/login');
        }



        
    }


    render() {
        return (
            <div style={{padding:"100px 100px",backgroundColor:"LightGray"}}>
                <div class="container">
                <div class="row">
                    <div class="col-sm">
                    <div>
                     <h1 style={{color:"red",margin:"0 20%",paddingBottom:"2%"}}>E-buy shopping</h1>
                    </div>
                   <img src="http://www.barrington.ag/images/ecommerce_payment.png" width="90%" height="80%"></img>

                    </div>
                    <div class="col-sm">
                     <h2>REGISTER</h2>

                    <div style={{backgroundColor:"#fefbd8",padding:"20px 20px"}}>
                    <form onSubmit={this.submitHandler} autocomplete="on">
                    <div className="form-group">
                        <label for="exampleInputName">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" placeholder="name" name="name" value={this.state.name} onChange={this.inputHandler} />
                    </div><br></br>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" name="email" value={this.state.email} onChange={this.inputHandler} />
                    </div><br></br>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={this.state.password} onChange={this.inputHandler} />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                    </div>
                    </div>

                </div>
                {/* <ToastContainer position="top-left"/> */}
                </div>
            </div>
            // <div style={{background:"#fefbd8",height:"100%"}}>
            //     <div>
            //         <h1 style={{color:"red",margin:"0 20%",paddingBottom:"2%"}}>E-buy shopping</h1>
                    
            //     </div>
            //     <div style={{backgroundColor:"",margin:"0 20%",padding:"0 230px"}}>
            //         <h2>REGISTER TO SHOP</h2>
                    
            //     <form onSubmit={this.submitHandler} autocomplete="off">
            //         <div className="form-group">
            //             <label for="exampleInputName">Name</label>
            //             <input type="text" className="form-control" id="exampleInputName" placeholder="name" name="name" value={this.state.name} onChange={this.inputHandler} />
            //         </div><br></br>
            //         <div className="form-group">
            //             <label for="exampleInputEmail1">Email address</label>
            //             <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" name="email" value={this.state.email} onChange={this.inputHandler} />
            //         </div><br></br>
            //         <div className="form-group">
            //             <label for="exampleInputPassword1">Password</label>
            //             <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={this.state.password} onChange={this.inputHandler} />
            //         </div>
            //         <br></br>
            //         <button type="submit" className="btn btn-primary">Submit</button>
            //     </form>
            // </div>
            // </div>
            
        );
    }
}

export default withRouter(Register);







// const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(this.state)
        // };
        // fetch('http://localhost:1000/register', requestOptions)
        //     .then(response =>  response.json())
        //     .then(data => console.log(data))
        //     .catch(function (error) {
        //         console.log(error);
        //     });
