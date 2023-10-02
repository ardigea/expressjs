// import library expressjs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json()) // for parsing application/json

//create logger middleware function
function LoggerMiddleware(req, res, next) {
  console.log(`Request received at: ${new Date()}`);
  next(); // continue process next function
}

// app.use(LoggerMiddleware);

//create http method get all customer untuk api customer
app.get('/api/customers', (req, res) => {
    const { keyword, category, limit } = req.query; //req query string spesifik untuk searching by keyword category dan limit

    res.status(200).json({
      //code: 200,
      message: 'get all data berhasil',
      data: [
        {
          name: 'Gea',
          email: 'hadirmangea25@gmail.com',
          role: 'dev'
        },
        {
          name: 'Ardi',
          email: 'ripetrituit@gmail.com',
          role: 'engi'
        }
      ],
      pagination: {
        total_record: 100,
        curren_page: 1,
        total_page: limit
      }, 
      search: {
        keyword: keyword,
        category: category
      }
    })
}) 

//create http method post add cust untuk api customer
app.post('/api/customers', LoggerMiddleware, (req, res) => {
  const { name, email, role} = req.body;

  // res.send(`thank you ${name} with email: ${email} and role : ${role} success`);
  res.status(200).json({
    message: "Create Data SUCCESS",
    data: {
      name: name,
      email: email,
      role: role
    }
  })
})

//create http method get detail cust untuk api customer

app.get('/api/customers/:id', (req, res) => {
  const customerID = req.params.id;  //id bisa diganti sesuai selera

  res.status(200).json({
    message: 'get data berhasil',
    data: {    // {} = object [] = array
        customerID: customerID,
        name: 'Gea',
        email: 'hadirmangea25@gmail.com',
        role: 'dev'
      }
  })
}) 


const port = 3000; // define variable port on 3000
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
})
