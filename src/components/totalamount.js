import {connect} from 'react-redux';

const Totalamount=(props)=>{
    return(
        <div>c</div>
    );
}
const mapStateToProps = (state) => {
    return {
        cart: state.cartProducts.cart
    }
}

export default connect(mapStateToProps, null)(Totalamount);

