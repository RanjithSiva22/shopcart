import { useState, useEffect } from 'react';
import Header from '../components/header';
import {connect} from 'react-redux';
import { CART_ITEMS,REMOVE_ITEMS } from '../redux/actions';

const Product=(props)=> {
        const [data,setData]=useState({quantity:1});
        const  {toCart,removefromCart,cart}=props;
        // console.log(cart);
        const [but,setBut]=useState('');

        // console.log(toCart+"........................");
        const pathname = window.location.pathname 
        
        const arr=pathname.split('/');
        const pid=arr[arr.length-1];
        // console.log(pid);
        // data.quantity=1;

        const x=cart.findIndex(i=>i.id==pid);
        // console.log(x);

        useEffect(()=>{
            fetch(`https://fakestoreapi.com/products/${pid}`)
            .then(res=>res.json())
            .then(json=>{
                if(x!==-1){
                    setBut("red");
                }else{
                    setBut("green");
                }
                setData({...data,...json})            
            });
        },[]);

       
        return (
            
            <div style={{backgroundColor:"whitesmoke"}}>
                <Header/>

                <div style={{marginLeft:"40%"}}>
                <h1>{data.category}</h1><br>
                </br>
                <div className="card" style={{width: '18rem'}}>
                <img className="card-img-top" src={data.image} height="10%" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Product id: {data.id}</h5>
                    <p className="card-text" style={{color:"green"}}>{data.title}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" style={{color:"orange"}}>Price : ${data.price}</li>
                    <li className="list-group-item">Rating : 4.5</li>
                </ul>
                <div className="card-body">

                    {but==="green"?
                        <>
                        <button type="button" style={{marginLeft:"5px"}} className="btn btn-success" onClick={()=>{setBut("red");toCart(data)}}>ADD</button>
                        </>  :
                        <>
                        <button type="button" style={{marginLeft:"5px"}} className="btn btn-danger" onClick={()=>{ setBut("green");removefromCart(data)}}>REMOVE</button>
                        </> 
                    }

                    {/* <button type="button" className="btn btn-danger" onClick={()=>toCart(data)}>your cart</button> */}
                    <a href="/" className="card-link" style={{paddingLeft:"80px"}}>Pay</a>
                </div>
                </div>
                </div>
            </div>
            
        );
    
}

// export default Product;
const mapStateToProps = (state) => {
    return {
        cart: state.cartProducts.cart
    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        toCart:(item)=>dispatch({type:CART_ITEMS,purchase:item}),
        removefromCart:(item)=>dispatch({type:REMOVE_ITEMS,remove:item.id})

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Product);