import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import {loginapi} from './services/login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

    }
    inputHandler = (e) => {
        // console.log(e.target.name);
        switch (e.target.name) {
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
        // const { email, password } = this.state;
        e.preventDefault();
        // console.log('login');
        let res= await loginapi(this.state);
        // console.log(res);
        if(res){
        // this.props.login;
        //  this.props.setIsAuthenticated(true);
        console.log(this.props);
        if(this.props.location.state===undefined)
            this.props.history.push('/');
        else
            this.props.history.push(this.props.location.state.from.pathname);
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
                   <img src="https://www.stackma.ca/images/services/website/ecommerce/ecommerce-website-design.png" width="90%" height="80%"></img>

                    </div>
                    <div class="col-sm">
                     <h2>LOGIN</h2>

                    <div style={{backgroundColor:"#fefbd8",padding:"20px 20px"}}>
                    <form onSubmit={this.submitHandler} autoComplete="on">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" name="email" value={this.state.email} onChange={this.inputHandler} />
                    </div><br></br>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={this.state.password} onChange={this.inputHandler} />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Submit</button><br></br>
                    <Link to="/register"><span>register</span></Link>
                    </form>
                    </div>
                    </div>

                </div>
                </div>
            </div>
            // <div>
                // <form onSubmit={this.submitHandler} autoComplete="on">
                //     <div className="form-group">
                //         <label for="exampleInputEmail1">Email address</label>
                //         <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" name="email" value={this.state.email} onChange={this.inputHandler} />
                //     </div><br></br>
                //     <div className="form-group">
                //         <label for="exampleInputPassword1">Password</label>
                //         <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={this.state.password} onChange={this.inputHandler} />
                //     </div>
                //     <br></br>
                //     <button type="submit" className="btn btn-primary">Submit</button><br></br>
                //     <Link to="/register"><span>register</span></Link>
                // </form>
            // </div>
        );
    }
}
export default withRouter(Login);