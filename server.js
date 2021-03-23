const fs = require('fs');
const http = require('http');
const fetch = require('node-fetch');

const SERVER_TIME_RAW = new Date();

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');

  let dataRaw = fs.readFileSync('./data.json');
  let data = JSON.parse(dataRaw);

  let shouldUpdate = true;
  if(data.date.split("T")[1] == dateToYMD(SERVER_TIME_RAW).split("T")[1]){
    shouldUpdate = false;
  }

  if(!shouldUpdate){
    res.end(JSON.stringify(data, null, 2));
  }else{
    fetch("https://api.collectapi.com/economy/liveBorsa", {
       headers: {
         'Authorization': 'apikey YOUR-API-KEY',
         'Content-Type': 'application/json'
       },
    }).then(res => res.json()).then(json => {

      // Stamp the data here;
      json.date = dateToYMD(SERVER_TIME_RAW);

      let stringified = JSON.stringify(json, null, 2);

      fs.writeFile("data.json", stringified, (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });

      res.end(stringified);
    });
  }
});


const hostname = '165.22.85.177';
const port = 5000;

server.listen(port, hostname, () => {
  	console.log(`Server running at http://${hostname}:${port}/`);
});


/*
-----------
*/

function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  var h = date.getHours();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)+'T'+h;
}
