import axios from 'axios';
const bcrypt = require('bcryptjs');
var sendRequest = require('http')

async function addUserDatabase(email, password, username) {

    // Encrypt user password when storing it in database
    const encryptPassword =  bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    console.log(encryptPassword);

    // JSON format of user datas
    const userDatas = JSON.stringify({
        email: email,
        password: encryptPassword,
        username: username,
    });

    // Add request headers
    const requestHeaders = {
        hostname: 'localhost',
        port: '8080',
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': userDatas.length
        }
    };

    // Send request
    let makeRequest = sendRequest.request(requestHeaders, (body) => {
        console.log(`return value : ${body.statusCode}`);
    });

    // Write user datas in databse
    makeRequest.write(userDatas);

    // End Request
    makeRequest.end();

}

async function getUserInDatabase(email, password) {
    console.log(bcrypt.hashSync(password, bcrypt.genSaltSync(10), null))
    const answer = await axios.get('http://localhost:8080')
        .then(body => {
            var ite = 0;
            for (; body.data[ite]; ite++) {
                console.log(bcrypt.hashSync(password, bcrypt.genSaltSync(10), null))
                if (body.data[ite].email === email && bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) === password) {
                    return (body.data[ite.email]);
                }
            }
            return ("failed");
        })
        .catch(fail => console.log(fail));
    return answer;
}

const userRequests = {
    addUserDatabase,
    getUserInDatabase
};

export default userRequests;