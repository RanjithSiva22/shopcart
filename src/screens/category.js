import { useEffect, useState } from "react";
import {
    useLocation
} from "react-router-dom";
import Card from '../components/card';
import Header from '../components/header';
import Loader from "react-loader-spinner";
import { connect } from 'react-redux';

const Category = (props) => {
    // console.log(props);
    const [filProduct, setProduct] = useState([]);
    let query = useQuery();
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const filter = query.get('type');
    console.log(filter)
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${filter}`)
            .then(res => res.json())
            .then(json => setProduct(json), console.log(filProduct))
    }, []);


    return (
        <div>
            <Header />
            <h1>{filter}</h1>
            {(filProduct.length === 0) ?
                <div style={{ textAlign: "center" }}><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></div> :
                <div className="row">
                    {filProduct.map(product => {
                        // console.log(this.state.cart);
                        const x = props.cart.findIndex(i => i.id === product.id);
                        // console.log(x);

                        if (x !== -1)
                            return <Card key={product.id} id={product.id} info={product} but="red" />
                        else
                            return <Card key={product.id} id={product.id} info={product} but="green" />
                    })}

                </div>
            }


        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartProducts.cart
    }
}
export default connect(mapStateToProps,null)(Category);