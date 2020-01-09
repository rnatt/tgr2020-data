const tf = require('@tensorflow/tfjs-node');
const csv = require('csv-parser');
const fs = require('fs');
const class_name = ['A','B','C','D'];
async function createData(filename){
  let mac = [];
  let dac = [];
  let label = [];
  let label1 = [];
  let g120 = [];
  let g150 = [];
  let g300 = [];
  let g330 = [];
  let g121 = [];
  let g151 = [];
  let g301 = [];
  let g331 = [];
  let g122 = [];
  let g152 = [];
  let g302 = [];
  let g332 = [];
  let g123 = [];
  let g153 = [];
  let g303 = [];
  let g333 = [];


  const dataset = tf.data.csv('file://'+filename, {hasHeader: true});
  const v = await dataset.toArray();
    v.forEach( (data) => {
        if(data.topic=='/tgr2020/jan08/data/12'){mac=[...mac,[0,parseInt(data.rssi, 10)]];}
        else if(data.topic=='/tgr2020/jan08/data/15'){mac=[...mac,[1,parseInt(data.rssi, 10)]];}
        else if(data.topic=='/tgr2020/jan08/data/30'){mac=[...mac,[2,parseInt(data.rssi, 10)]];}
        else if(data.topic=='/tgr2020/jan08/data/33'){mac=[...mac,[3,parseInt(data.rssi, 10)]];}

        if(data.topic=='/tgr2020/track/data/12'){mac=[...mac,[0,parseInt(data.rssi, 10)]];}
        else if(data.topic=='/tgr2020/track/data/15'){mac=[...mac,[1,parseInt(data.rssi, 10)]];}
        else if(data.topic=='/tgr2020/track/data/30'){mac=[...mac,[2,parseInt(data.rssi, 10)]];}
        else if(data.topic=='/tgr2020/track/data/33'){mac=[...mac,[3,parseInt(data.rssi, 10)]];}

        if(data.mac_addr=='80:E1:26:07:E3:79'){label1=[...label1,0];}
        else if(data.mac_addr=='80:E1:26:07:C4:0A'){label1=[...label1,1];}
        else if(data.mac_addr=='80:E1:26:07:D2:6F'){label1=[...label1,2];}
        else if(data.mac_addr=='80:E1:26:07:E0:F2'){label1=[...label1,3];}
        else{label1=[...label1,0];}
        
    });
    console.log(mac)
    console.log(label1)
    label1.forEach(function(data, i)
    {if(data==0){
      if(mac[i][0]==0){g120=[...g120,mac[i][1]];}
      if(mac[i][0]==1){g150=[...g150,mac[i][1]];}
      if(mac[i][0]==2){g300=[...g300,mac[i][1]];}
      if(mac[i][0]==3){g330=[...g330,mac[i][1]];}}
    });
    label1.forEach(function(data, i)
    {if(data==1){
      if(mac[i][0]==0){g121=[...g121,[mac[i][1]]];}
      if(mac[i][0]==1){g151=[...g151,[mac[i][1]]];}
      if(mac[i][0]==2){g301=[...g301,[mac[i][1]]];}
      if(mac[i][0]==3){g331=[...g331,[mac[i][1]]];}}
    });
    label1.forEach(function(data, i)
    {if(data==2){
      if(mac[i][0]==0){g122=[...g122,mac[i][1]];}
      if(mac[i][0]==1){g152=[...g152,mac[i][1]];}
      if(mac[i][0]==2){g302=[...g302,mac[i][1]];}
      if(mac[i][0]==3){g332=[...g332,mac[i][1]];}}
    });
    label1.forEach(function(data, i)
    {if(data==3){
      if(mac[i][0]==0){g123=[...g123,mac[i][1]];}
      if(mac[i][0]==1){g153=[...g153,mac[i][1]];}
      if(mac[i][0]==2){g303=[...g303,mac[i][1]];}
      if(mac[i][0]==3){g333=[...g333,mac[i][1]];}}
    });
    a = Math.min(g120.length,g150.length,g300.length,g330.length);
    b = Math.min(g121.length,g151.length,g301.length,g331.length);
    c = Math.min(g122.length,g152.length,g302.length,g332.length);
    d = Math.min(g123.length,g153.length,g303.length,g333.length);

    a = Math.min(a,b,c,d);
    console.log(a);
    console.log(g120);
    console.log(g150);
    console.log(g300);
    console.log(g330);
    console.log('1');
    console.log(g121);
    console.log(g151);
    console.log(g301);
    console.log(g331);
    console.log('2');
    console.log(g122);
    console.log(g152);
    console.log(g302);
    console.log(g332);
    console.log('3');
    console.log(g123);
    console.log(g153);
    console.log(g303);
    console.log(g333);


    for (var i =0; i<(100-g120.length); i){
       g120.push(-Math.floor((Math.random()*(67-37+1))+37));}

    for (var i =0;i<100-g150.length;i){
      g150.push(-Math.floor((Math.random()*(81-60+1))+60));}
    for (var i =0;i<100-g300.length;i){
      g300.push(-Math.floor((Math.random()*(88-66+1))+66));}
    for (var i =0;i<100-g330.length;i){
      g330.push(-Math.floor((Math.random()*(85-74+1))+74));}

    for (var i =0;i<100-g121.length;i){
      g121.push(-Math.floor((Math.random()*(82-60+1))+60));}
    for (var i =0;i<100-g151.length;i){
      g151.push(-Math.floor((Math.random()*(43-41+1))+41));}
    for (var i =0;i<100-g301.length;i){
      g301.push(-Math.floor((Math.random()*(80-73+1))+73));}
    for (var i =0;i<100-g331.length;i){
      g331.push(-Math.floor((Math.random()*(78-60+1))+60));}

    for (var i =0;i<100-g122.length;i){
      g122.push(-Math.floor((Math.random()*(85-71+1))+71));}
    for (var i =0;i<100-g152.length;i){
      g152.push(-Math.floor((Math.random()*(81-58+1))+58));}
    for (var i =0;i<100-g302.length;i){
      g302.push(-Math.floor((Math.random()*(56-30+1))+30));}
    for (var i =0;i<100-g332.length;i){
      g332.push(-Math.floor((Math.random()*(85-80+1))+80));}

    for (var i =0;i<100-g123.length;i){
      g123.push(-Math.floor((Math.random()*(85-76+1))+76));}
    for (var i =0;i<100-g153.length;i){
      g153.push(-Math.floor((Math.random()*(77-65+1))+65));}
    for (var i =0;i<100-g303.length;i){
      g303.push(-Math.floor((Math.random()*(84-71+1))+71));}
    for (var i =0;i<100-g333.length;i){
      g333.push(-Math.floor((Math.random()*(69-60+1))+60));}
      
    
    for (var i =0;i<100;i++){
      dac=[...dac,[g120[i],g150[i],g300[i],g330[i]]]
      label=[...label,0]}
    
  
    for (var i =0;i<100;i++){
        dac=[...dac,[g121[i],g151[i],g301[i],g331[i]]]
        label=[...label,1]}
    
    for (var i =0;i<100;i++){
      dac=[...dac,[g122[i],g152[i],g302[i],g332[i]]]
      label=[...label,2]}

    
    for (var i =0;i<100;i++){
      dac=[...dac,[g123[i],g153[i],g303[i],g333[i]]]
      label=[...label,3]}
    console.log(dac);
    
    return {dac,label};
}



function createModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({units: 10, activation: 'sigmoid', inputShape: [4]}));
  model.add(tf.layers.dense({units: 5, activation: 'sigmoid'}));
  model.add(tf.layers.dense({units: 4, activation: 'softmax'}));
  model.compile({optimizer: tf.train.adam(0.01), loss: 'categoricalCrossentropy'});
  return model;
}

async function trainModel(model,xs,ys,epochs){
  const history = await model.fit(xs, ys, {
  epochs: epochs,
  callbacks: {
    onEpochEnd: (epoch, log) => {
      console.log(`Epoch ${epoch}: loss = ${log.loss}`)
  }
    
  }  
}); 
  //console.log(history.history.loss);
  await model.save('file://./mymodel');
  temp = history.history.loss;
  return temp;
}

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
  console.log(l);
  return a;
}

const test = async()=>{
  temp = await createData('data3.csv');
  //console.log(temp.dac);
  //console.log(temp.label);
  x = tf.tensor2d(temp.dac);
  x.print();
  //x = tf.reshape(x,[2,-1])
  y = tf.oneHot(temp.label,4);
  y.print();
  model = await createModel();
  y = await trainModel(model,x,y,200);
 // x =tf.tensor2d([[1,-80]])
  x = tf.tensor2d([[ -47, -70, -66, -77 ]]);
  y = await predictModel(x);
  predict = class_name[y];
  console.log(predict);

}
test();