'use strict'
const mongoose = require('mongoose')
const config = require('./config')

async function hello(event) {
  // mongoose.connect(config.MONGO_CONNECTION_STRING, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // });
  // const Cat = mongoose.model("Cat", { name: String });
  // const kitty = new Cat({ name: "Zildjian" });
  // await kitty.save();
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: "Go Serverless v1.0! Your function executed successfully!",
  //       data: kitty
  //     },
  //     null,
  //     2
  //   )
  // };
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}

async function getProducts(event) {
  // mongoose.connect(config.MONGO_CONNECTION_STRING, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // });
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: "Successfully getting response"
  //     },
  //     null,
  //     2
  //   )
  // };
}

module.exports = {
  hello: hello,
  getProducts: getProducts,
}
