

export const registerapi=async(form)=>{
    let bool=false;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    };
    await fetch('http://localhost:1000/register', requestOptions)
        .then(response =>  response.text())
        .then(data => {
            console.log(data);
            if(data==="sucess") bool=true;
            // console.log(bool)

        })
        .catch(function (error) {
            console.log(error.response.data);
        });
        // console.log(bool)

    return bool;
}