// use mongoose
const mongoose = require('mongoose')

// connect mongodb alats
const mongodburl = "mongodb+srv://hdrproject:50230@cluster0.ktm1unb.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);

mongoose.connect(mongodburl,{dbName:"HDRProjecct"},{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))


let StudentData = mongoose.model("StudentData", mongoose.Schema({
    Room:Number,
    Number:Number,
    StudentNumber:Number,
    StudentName:String,
}))

module.exports = StudentData
