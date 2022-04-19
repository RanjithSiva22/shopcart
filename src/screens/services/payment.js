

export const paymentapi=async(pay)=>{
    let bool=false;
    const token = JSON.parse(localStorage.getItem('token'));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','auth-token': token },
        body: JSON.stringify(pay)
    };
    await fetch('http://localhost:1000/payment/api',requestOptions)
        .then(response =>  response.text())
        .then(data => {
            console.log(data);
            if(data==="paymentsaved") bool=true;
            // console.log(bool)

        })
        .catch(function (error) {
            console.log(error.response.data);
        });
        // console.log(bool)

    return bool;
}