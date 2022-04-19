
// import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';

const Header=(props)=>{
    // const [total,setTotal]=useState(0);
    // console.log(props);
    const l=props.items.length;
    const history = useHistory();
    // console.log(history);
    const viewCart=()=>history.push('/yourcart-details');
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand" href="/">SHOPCART</a>

        <button type="button" className="btn btn-primary" style={{marginLeft:'70%'}} onClick={viewCart}> 
        Your Cart <span className="badge badge-light">{l}</span>
        </button>
        </nav>
    );
}
const mapStateToProps=(state)=>{
    // console.log(state.cartProducts.cart);
    return {
        items:state.cartProducts.cart
    }
}
export default connect(mapStateToProps,null)(Header);

        // <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        // <a className="navbar-brand" href="/">SHOPCART</a>

        // <button type="button" className="btn btn-primary" style={{marginLeft:'70%'}} onClick={viewCart}> 
        // Your Cart <span className="badge badge-light">{l}</span>
        // </button>
        // </nav>