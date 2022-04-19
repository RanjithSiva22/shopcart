
// import {connect} from 'react-redux';
// import {useState} from 'react';

const Carttable=(props)=>{
    const {removeitem,detail,updateqty}=props;
    const {id,image,title,price,quantity}=detail;
    return(
       <>
            <tr>
            <th scope="row">{id}</th>
            <td>{title}</td>
            <td><img src={image} height="50px" width="50px"></img></td>
            <td>{price}</td>
            <td>
                <button onClick={()=>updateqty('-',id)}>-</button>
                <span style={{margin:"5px"}}>{quantity}</span>
                <button onClick={()=>updateqty('+',id)}>+</button>
            </td>
            <td>
            <button type="button" class="btn btn-danger" onClick={()=>removeitem(id)}>REMOVE ITEM</button>
            </td>
            </tr>
                
       </>
    );
}

export default Carttable;

// const mapDispatchToProps =(dispatch)=>{
//     return {
//         addToCart:(item)=>dispatch({type:CART_ITEMS,purchase:item}),
//         removefromCart:(item)=>dispatch({type:REMOVE_ITEMS,remove:item.id}),
       
//     }
// }
// export default connect(null,mapDispatchToProps)(Carttable);

{/* <button onClick={()=>{setQuants(quants-1,updateqts(id,quants-1))}}>-</button>
                <span style={{margin:"5px"}}>{quants}</span>
                <button onClick={()=>{setQuants(quants+1,updateqts(id,quants+1))}}>+</button></td> */}


                 // updateqts: (id,quants)=>dispatch({type:UPDATE_QTY,id:id,quants:quants})