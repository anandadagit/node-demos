const http = require('http');
const fs = require('fs'); 

const server = http.createServer( (req, res) => {
    const url = req.url;
    const method = req.method; 
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html'); 
        res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
                res.write('<body>');
                    res.write('<form action="/message" method="POST">'); // GET, POST,
                        res.write('<input type="text" name="message">'); // POST will send all the data within the form elements
                        res.write('<button type="submit">Send</button>');
                    res.write('</form>')
                res.write('</body>');
        res.write('</html>');
        return res.end(); // return is required otherwise the next code block below will be executed
    }

    // Added a new catch
    if (url === '/message' && method === 'POST') {
        // We have some data that needs to be saved. We need to store this data before 
        // sending the statuscode and before redirecting
        const body = [];
        // so register an eventlistener        
        req.on('data', (chunk) => { // Listen to the data event
            console.log(chunk);
            body.push(chunk); // store the chunks of data into the body const
        }); 
        // check what happens when you run this code without the return keyword
        return req.on('end', () => { // Listen to the end event
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message); 
            // moved the following three lines inside the end event
            res.statusCode = 302;  
            res.setHeader('Location', '/'); 
            return res.end();
        });       
    }
    
    res.setHeader('Content-Type', 'text/html');     
    res.write('<html>'); 
    res.write('<head>');
    res.write('<title>This is my cool website</title>');
    res.write('</head>');
    res.write('<body><h1>Welcome to my website</h1></body>');
    res.write('</html>');
    res.end();
    //res.write(); // this line will result in an error since you cannot write after called res.end()
})

server.listen(3005);

/*
Explain the asynchronous nature of Node and the need to add return to the end event

*/



