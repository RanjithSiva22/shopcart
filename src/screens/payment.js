import { Component } from 'react';
import {paymentapi} from './services/payment';
import { connect } from 'react-redux';
import { PAYMENT_OVER } from '../redux/actions';
import Header from '../components/header';


import {
    withRouter
  } from "react-router-dom";
import '../css/payment.module.css';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipAddress:{
                name:'',
                email:'',
                address:'',
                city:'',
                state:'',
                zip:'',
            },
            paymentDetails:{
                cardname:'',
                cardnumber:'',
                expmonth:'',
                expyear:'',
                cvv:'',
            }
        };
        this.method=props;
    }
    addressHandler = (e) => {
        const {shipAddress}=this.state;
        // console.log(e.target.name);
        this.setState({shipAddress:{...shipAddress,[e.target.name]:e.target.value}})
        
    }
    paymentHandler = (e) => {
        // console.log(e.target.name);
        const {paymentDetails}=this.state;

        this.setState({paymentDetails:{...paymentDetails,[e.target.name]:e.target.value}})
        
    }
    submitHandler = async(e) => {
        e.preventDefault();
        // console.log(this.state);
        let res= await paymentapi(this.state);
        console.log(res);
        if(res){
            // alert("payment success");
            this.method.reset_store();
            this.props.history.push('/');
        }
        

        // swal("Good job!", "You clicked the button!", "success");
    }
    render() {
        return (
        <div>
            <Header/>
            <div class="row" style={{backgroundColor:"black"}}>
            <div class="col-75">
                <div class="container">
                <form onSubmit={this.submitHandler}>
                
                    <div class="row">
                    <div class="col-50" style={{margin:"20px 20px",color:"green"}}>
                        <h3 style={{color:"blue"}}>Shipping Address</h3>
                        <label for="fname"><i class="fa fa-user"></i> Full Name</label>
                        <input type="text" id="fname" name="name" placeholder="John M. Doe" onChange={this.addressHandler}/>
                        <label for="email"><i class="fa fa-envelope"></i> Email</label>
                        <input type="text" id="email" name="email" placeholder="john@example.com" onChange={this.addressHandler}/>
                        <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
                        <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" onChange={this.addressHandler}/>
                        <label for="city"><i class="fa fa-institution"></i> City</label>
                        <input type="text" id="city" name="city" placeholder="New York" onChange={this.addressHandler}/>

                        <div class="row">
                        <div class="col-50"style={{margin:"20px 20px"}}>
                            <label for="state">State</label>
                            <input type="text" id="state" name="state" placeholder="NY" onChange={this.addressHandler}/>
                        </div>
                        <div class="col-50" style={{margin:"20px 20px"}}>
                            <label for="zip">Zip</label>
                            <input type="text" id="zip" name="zip" placeholder="10001" onChange={this.addressHandler}/>
                        </div>
                        </div>
                    </div>

                    <div class="col-50"style={{margin:"20px 20px",color:"orange"}}>
                        <h3 style={{color:"blue"}}>Payment</h3>
                        <label for="fname">Accepted Cards</label>
                        <div class="icon-container">
                        <i class="fa fa-cc-visa" style={{color:"navy",marginLeft:"3px"}}></i>
                        <i class="fa fa-cc-amex" style={{color:"blue",marginLeft:"3px"}}></i>
                        <i class="fa fa-cc-mastercard" style={{color:"red",marginLeft:"3px"}}></i>
                        <i class="fa fa-cc-discover" style={{color:"orange",marginLeft:"3px"}}></i>
                        </div>
                        <label for="cname">Name on Card</label>
                        <input type="text" id="cname" name="cardname" placeholder="John More Doe" onChange={this.paymentHandler}/>
                        <label for="ccnum">Credit card number</label>
                        <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" onChange={this.paymentHandler}/>
                        <label for="expmonth">Exp Month</label>
                        <input type="text" id="expmonth" name="expmonth" placeholder="September" onChange={this.paymentHandler}/>
                        <div class="row">
                        <div class="col-50"style={{margin:"20px 20px"}}>
                            <label for="expyear">Exp Year</label>
                            <input type="text" id="expyear" name="expyear" placeholder="2018" onChange={this.paymentHandler}/>
                        </div>
                        <div class="col-50" style={{margin:"20px 20px"}}>
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" placeholder="352" onChange={this.paymentHandler}/>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                   
                    <button type="submit" style={{backgroundColor:"red",marginLeft:"40%",padding:"0 10px"}}>PAY</button>
                </form>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset_store:()=>dispatch({type:PAYMENT_OVER})
    }
}

export default withRouter(connect(null,mapDispatchToProps)(Payment));

