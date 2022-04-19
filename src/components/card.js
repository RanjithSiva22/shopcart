import {
    useHistory
  } from "react-router-dom";
import {connect} from 'react-redux';
import { CART_ITEMS,REMOVE_ITEMS } from '../redux/actions';
import {useState} from 'react';

const Card=(props)=>{
    const {image,price,title,id}=props.info;
    const  {addToCart,removefromCart,but}=props;
    // const [but,setBut]=useState('add');
    // console.log(props);
    const [color,setColor]=useState(but);

    const link=useHistory();

    props.info.quantity=1;
    
    const handleClick=(id)=> {
        console.log("cards click");
        link.push(`/product/${id}`);
    }
    // const chooseproduct=(event,but,info)=>{
    //     event.stopPropagation();
    //     if(but==='add'){
    //         setBut('remove');
    //         setColor('btn-danger');
    //         addToCart(info);
    //     }
    //     else if(but==='remove'){
    //         setBut('add');
    //         setColor('btn-success');
    //         removefromCart(info);
    //     }
    // }
    
    return(
       <div style={{margin: "5px 5px",cursor: "pointer"}} onClick={()=>handleClick(id)}>
            <div className="card" style={{width: "18rem"}}>
            <img src={image} className="card-img-top" alt="..."/>
            <div className="card-body" >
                <h5 className="card-title">{title}</h5>
                <p className="card-text"><span>Price : $</span>{price}</p>
            </div>
            <div className="card-body">
                {/* <button type="button" class={`btn ${color}`} onClick={(event)=>chooseproduct(event,but,props.info)}>{but}</button> */}

                {color==="green"?
                    <>
                    <button type="button" style={{marginLeft:"5px"}} className="btn btn-success" onClick={(event)=>{ event.stopPropagation();setColor("red");addToCart(props.info)}}>ADD</button>
                    </>  :
                    <>
                    <button type="button" style={{marginLeft:"5px"}} className="btn btn-danger" onClick={(event)=>{ event.stopPropagation();setColor("green");removefromCart(props.info)}}>REMOVE</button>
                    </> 
                }

                {/* <Link to={`/product/${id}`}><h2>info</h2></Link>   ////////////////////////style={{width: "18rem"}} */}
                </div>
            </div>
       </div>
    );
}



const mapDispatchToProps =(dispatch)=>{
    return {
        addToCart:(item)=>dispatch({type:CART_ITEMS,purchase:item}),
        removefromCart:(item)=>dispatch({type:REMOVE_ITEMS,remove:item.id})
    }
}
export default connect(null,mapDispatchToProps)(Card);