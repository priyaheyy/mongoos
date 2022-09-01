const express = require("express");
const mongoose = require("mongoose");
const app = express();

//create new connection and creating a new DB
mongoose.connect("mongodb://0.0.0.0:27017/testy",{
 
    useNewUrlParser: true,
   
    useUnifiedTopology: true
})
.then(()=>console.log("connection successful"))
.catch((err)=>{console.log(err)})

//creating the structure of the DB through schemas
const doc=new mongoose.Schema({
    name:String,
    active:Boolean,
    age:Number,
    adress:String
})

//creating collections inside the DB through models
const mod1=new mongoose.model("first",doc)

//create document or insert
const createDoc=async()=>{  //use try catch block with async await
    try{
        const mod3=new mod1({
            name:"dhf",
            active:true,
            age:23,
            adress:"dfd"
        })
        const mod4=new mod1({
            name:"sdff",
            active:false,
            age:33,
            adress:"sdfdk"
        })
        //const result=await mod.save(); //this command will save above data  into the collection
        const result=await mod1.insertMany([mod3,mod4]); //to insert multiple documents
        //console.log(result)
    }catch(err){
        console.log(err)
    }

  
}
createDoc();


//read the documents
const readDoc=async()=>{
    try{
        const result=await mod1.find({adress:{$in:["dfd"]}})
        .select({name:1})
        .limit(1)
       
        console.log(result) 
    }catch(err){
        console.log(err)
    }
    
}


readDoc();
      





app.listen(4000)