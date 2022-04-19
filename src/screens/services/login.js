

export const loginapi=async({email,password})=>{
    let bool=false;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    };
    // console.log(email);

    await fetch('http://localhost:1000/login', requestOptions)
        .then(response => response.text())
        .then(data => {
            const arr=data.split(" ");
            if(arr[0]==="sucess"){
                bool=true;
                localStorage.setItem('token', JSON.stringify(arr[1]));
                localStorage.setItem('email', JSON.stringify(arr[2]));

            }else{
                console.log(data);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
    console.log('after fetch')
    return bool;

}