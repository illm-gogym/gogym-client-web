const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;
const route = require('./routes/index');

// const corsOptions ={
// 	origin:'*',
// 	credentials:true,            //access-control-allow-credentials:true
// 	optionSuccessStatus:200,
// }
//
// app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(cors());

app.use(bodyParser.json());
app.use('/api', route);

app.listen(port, ()=>{
	console.log(`express is running on ${port}`);
})