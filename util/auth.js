import axios from 'axios';


async function authenticate(mode, email, password) {
    const url = `http://www.kushalkaamgar.com/kk.api/account/${mode}`;

    const response = await axios.post(url, {
        email: email,
        password: password,
        //returnSecureToken: true,
    });

    const token = response.data;
    console.log(token);

    return token;
}

async function authcreate(mode, firstname, lastname, email, phonenumber, password, confirmpassword) {
    const url = `http://www.kushalkaamgar.com/kk.api/account/${mode}`;

    const response = await axios.post(url, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phonenumber: phonenumber,
        password: password,
        confirmpassword: confirmpassword,
    });

    const token = response.data;

    console.log(token);

    return token;
}



export function createUser(firstname, lastname, email, phonenumber, password, confirmpassword) {
    return authcreate('signup', firstname, lastname, email, phonenumber, password, confirmpassword);

}

export function login(email, password) {
    return authenticate('login', email, password);

}