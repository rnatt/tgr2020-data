const tf = require('@tensorflow/tfjs-node');
const http = require('http');
const request = require('request')
const class_name = ['A','B','C','D'];



async function predictModel(xv){
  const model = await tf.loadLayersModel('file://./mymodel/model.json');
  y = await model.predict(xv);
  v=Array.from(await y.data())
  let l =[];
  l = [...l,v[0]];
  l = [...l,v[1]];
  l = [...l,v[2]];
  l = [...l,v[3]];
  a=l.indexOf(Math.max(...l));
  //console.log(l);
  return a;
}



function call1(){
  setTimeout(() => {
http.get('http://202.139.192.184/api/tr25lt', (response) => {
  let todo = '';
  var predict= 'A';
  response.on('data', (chunk) => {
    todo += chunk;
  });

  // called when the complete response is received.
  response.on('end', () => {
    //todo.rssi
    var v = JSON.parse(todo);
    var x = [[-100,-100,-100,-100]];
    if(v.ss12 !==null){x[0][0] = v.ss12.rssi;}
    if(v.ss15 !==null){x[0][1] = v.ss15.rssi;}
    if(v.ss30 !==null){x[0][2] = v.ss30.rssi;}
    if(v.ss33 !==null){x[0][3] = v.ss33.rssi;}
    const test = async()=>{
      x = await tf.tensor2d(x);
      y = await predictModel(x);
      predict = class_name[y];
      console.log(predict);
      request.post('http://202.139.192.184/api/datapost', {
      json: {
      predict: predict
      }
      }, (error, res, body) => {
      if (error) {
      console.error(error)
      return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
})
    }
    test();
    
  });

}).on("error", (error) => {
  console.log("Error: " + error.message);
});},2000);
  
}

let i = 0;
setInterval(() => {call1()},2000);