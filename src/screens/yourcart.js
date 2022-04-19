// import {compose} from "redux";
import { connect } from 'react-redux';
import Carttable from '../components/carttable';
import { REMOVE_ITEMS, UPDATE_QTY } from '../redux/actions';
import {cartapi} from './services/cart';
import {
    useHistory
  } from "react-router-dom";

import { useState } from 'react';

const YourCart = (props) => {
    const { cart, removefromCart, updatepurchase } = props;
    // console.log(cart);
    const [cartpds, setCartpds] = useState(cart);
    // const [total,setTotal]=useState(0);
    // console.log(total);
    const link=useHistory();

    const num = cartpds.length;
    console.log("num " + num);
    const removeitem = (id) => {
        const arr=cartpds.filter((item)=>item.id!==id);
        setCartpds(arr);
        removefromCart(id);
        console.log("p" + arr);
    }
    // console.log("total "+total);
    let tot = 0;
    if (num > 0) {
        for (let i = 0; i < num; i++) {
            console.log("tot "+cartpds[i].quantity);

            if (cartpds[i].quantity !== (0 || 1))
                tot += (cartpds[i].quantity * cartpds[i].price);
            else
                tot += cartpds[i].price;
        }
    }
    console.log(tot);



    const updateqty = (sign, id) => {
        console.log(sign + " " + id);
        const a = cartpds.findIndex((obj => obj.id === id));
        if (sign === '+') {
            cartpds[a].quantity++;
        } else if (sign === '-') {
            cartpds[a].quantity--;
        }

        console.log(cartpds[a]);
        setCartpds(cartpds);
        updatepurchase(cartpds);
        console.log(cartpds);

    }

    const saveCart=async (e)=>{
        e.preventDefault();
        console.log('----------cart data');
        const name = JSON.parse(localStorage.getItem('name'));
        let res=await cartapi({name,num,cartpds,tot});
        console.log(res);
        if(res) return link.push('payment');

    }

    return (

        <div>
            {num > 0 ? (
                <>
                    <h1>PRODUCTS IN YOUR CART {num}</h1>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#no.</th>
                                <th scope="col">Product Title</th>
                                <th scope="col">image</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Remove item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartpds.map(product => <Carttable
                                key={product.id}
                                detail={product}
                                removeitem={removeitem}
                                updateqty={updateqty}
                            />)}
                        </tbody>
                    </table>
                    <h3>Total Amount {tot}</h3>
                    <button onClick={saveCart}>Confirm</button>
                </>
            )
                : <><h1>Your cart is Empty</h1></>}

        </div>

    );

}
const mapStateToProps = (state) => {
    return {
        cart: state.cartProducts.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removefromCart: (id) => dispatch({ type: REMOVE_ITEMS, remove: id }),
        updatepurchase: (cartpds) => dispatch({ type: UPDATE_QTY, update: cartpds })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourCart);




