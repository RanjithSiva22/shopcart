import { Component } from 'react';
import {
    withRouter
} from "react-router-dom";
import { connect } from 'react-redux';

import Card from '../components/card';
// import {connect} from 'react-redux';
// import { STORE_PRODUCTS } from '../redux/actions';
import Header from '../components/header';
// import styles from '../css/styles.module.css';
import Loader from "react-loader-spinner";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            products: [],
            filter: '',
            cart: props.cart
        };

    }

    getUserName(requestOptions) {
        return fetch('http://localhost:1000/posts/home', requestOptions);
    }

    getProductData() {
        return fetch('https://fakestoreapi.com/products');
    }

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('token'));
        const email = JSON.parse(localStorage.getItem('email'));

        // console.log(token);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'auth-token': token, 'email': email },
        };

        Promise.all([this.getUserName(requestOptions), this.getProductData()])
            .then((results) =>
                Promise.all(results.map(r => r.json()))
            ).then(res => {
                this.setState({
                    name: res[0].name,
                    products: res[1]
                }, () => {
                    localStorage.setItem('products', JSON.stringify(this.state.products))
                    localStorage.setItem('name', JSON.stringify(this.state.name))
                });
            });

    }

    logoutHandle = () => {
        localStorage.clear();
        this.props.history.replace('/');
    }

    filterHandler = (e) => {
        console.log(e.target.value);
        this.setState({ filter: e.target.value });
    }
    searchHandler = () => {
        this.props.history.push(`/category?type=${this.state.filter}`);
    }

    dropHandle = (e) => {
        // console.log(e.target.value);
        let s = e.target.value;
        const list = JSON.parse(localStorage.getItem('products'));

        if (s === 'low') {
            const arr = list.filter(i => i.price <= 50);
            this.setState({ products: arr })
        } else if (s === 'all') {
            this.setState({ products: list })
        } else if (s === 'medium') {
            const arr = list.filter(i => i.price > 50 && i.price < 500);
            this.setState({ products: arr })
        } else {
            const arr = list.filter(i => i.price >= 500);
            this.setState({ products: arr })
        }
    }

    render() {
        return (
            <div className="container-fluid" style={{ backgroundColor: "#F5F5F5" }}>
                <Header />
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">hello {this.state.name}</h1>
                        <button onClick={this.logoutHandle}>logout</button><br></br>
                        {/* <Link to="/posts">post</Link><br></br> */}
                        <div className="input-group" style={{ justifyContent: "center", alignItems: "center" }}>

                            <div className="form-outline">
                                <input type="search" id="form1" className="form-control" name="filter" value={this.state.filter} onChange={this.filterHandler} />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.searchHandler}>
                                search
                                {/* <i className="fas fa-search"></i> */}
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="https://www.tutorialrepublic.com/snippets/designs/product-list-carousel-for-ecommerce-website.png" alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src="https://weaveapps.com/wp-content/uploads/2014/12/screenshot-11.jpg" alt="Second slide"/>
                    </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="data:image/png;base64,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" alt="Third slide"/>
                    </div>
                </div>
                </div> */}



                <br></br>
                <select id="price" name="price" onChange={this.dropHandle}>
                    <option value="all">All</option>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>

                {(this.state.products.length === 0) ?
                    <div style={{textAlign:"center"}}><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></div> :
                    <div style={{ marginLeft: "10%", padding: "0px 10px" }}>
                        <div className="row">
                            {this.state.products.map(product => {
                                // console.log(this.state.cart);
                                const x = this.state.cart.findIndex(i => i.id === product.id);
                                // console.log(x);

                                if (x !== -1)
                                    return <Card key={product.id} id={product.id} info={product} but="red" />
                                else
                                    return <Card key={product.id} id={product.id} info={product} but="green" />
                            })}

                        </div>
                    </div>
                }


                <br>
                </br>
                <div style={{ left: 0, bottom: 0, width: "100%", height: "80px", backgroundColor: "#F0FFFF", color: "white", textAlign: "center" }}>
                    <p style={{ color: "blue" }}>Contact us:<br></br><span style={{ color: "black" }}>ebuy@gmail.com</span></p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartProducts.cart
    }
}


export default withRouter(connect(mapStateToProps, null)(Home));