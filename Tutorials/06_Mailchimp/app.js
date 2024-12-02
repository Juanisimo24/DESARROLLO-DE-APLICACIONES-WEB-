const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const path = require('path');
const app = express();

const apiKey = '25817746c83b59b1acd6e44f179049dc-us15';
const list_id = '352fce6a9b';
const serverPrefix = 'us15';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/', (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    // Crear el objeto de datos
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${list_id}`;

    const options = {
        method: 'POST',
        auth: `anystring:${apiKey}`
    };

    // Crear la variable mailRequest y realizar la solicitud
    const mailRequest = https.request(url, options, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });

        response.on('end', () => {
            if (response.statusCode === 200) {
                const parsedData = JSON.parse(responseData);

                if (parsedData.error_count > 0) {
                    console.log(`Error: ${parsedData.errors[0].error}`);
                    console.log(`Error Code: ${parsedData.errors[0].error_code}`);
                    res.sendFile(path.join(__dirname, 'failure.html'));
                } else {
                    res.sendFile(path.join(__dirname, 'success.html'));
                }
            } else {
                res.sendFile(path.join(__dirname, 'failure.html'));
            }
        });
    });

    // Manejar errores en la solicitud
    mailRequest.on('error', (err) => {
        console.error(err);
        res.sendFile(path.join(__dirname, 'failure.html'));
    });

    // Escribir los datos en el cuerpo de la solicitud
    mailRequest.write(jsonData);

    // Finalizar la solicitud
    mailRequest.end();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
