const tf = require('@tensorflow/tfjs-node');

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
  console.log(l);
  return a;
}

const test = async()=>{
  x = tf.tensor2d([[ -50, -80, -10, -50 ]]);
  y = await predictModel(x);
  predict = class_name[y];
  console.log(predict);

}
test();