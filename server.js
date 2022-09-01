const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyparser=require('body-parser')
app.use(bodyparser.json())
const cors=require('cors')
app.use(cors())

app.post('/data',(req,res)=>{
    
    // console.log(req)
    const{name,type,duration,price,mrp,discount,rating,category,thumbnail,demo}=req.body
    const createDoc = async () => {  //use try catch block with async await
  try {
        const doc2 = new mod1({
         
            name: `${name}`,
            type: `${type}`,
            price: `${price}`,
            mrp: `${mrp}`,
            discount: `${discount}`,
            rating: `${rating}`,
            category: `${category}`,
           Thumbnail: `${thumbnail}`,
            demo: `${demo}`,
            duration: `${duration}`,

           
          
            
            }) 
             await mod1.insertMany([doc2])
             res.json({"message":"data stored"})
            }catch(err){
            console.log(err)
        } }
        createDoc();
    }) 
    app.post('/:option',(req,res)=>{
        //console.log(req.body)
        const obj={}
        
        obj['data']=[]
        var option=req.body.option
        var value=req.body.value
        if(option=='price')
        {
            mod1.find({id:`${value}`}).then((result)=>
            {
                obj['data'].push(`id: ${result[0]._id}`,`name: ${result[0].name}`,`type: ${result[0].type}`, `price: ${result[0].price}`,`mrp: ${result[0].mrp}`,`discount: ${result[0].discount}`,`rating: ${result[0].rating}`,`category: ${result[0].category}`,`thumbnail: ${result[0].Thumbnail}`,`demo: ${result[0].demo}`)
                res.json({'data':`${obj.data}`})
            })
            
        }
        else if(option=='id'){
            mod1.find({id:`${value}`})
        } 
        else if(option=='category'){
            mod1.find({category:`${value}`})
        }else{
            mod1.find({rating:`${value}`})
        }
    })


  
//create new connection and creating a new DB
mongoose.connect("mongodb://0.0.0.0:27017/db", {

    useNewUrlParser: true,

    useUnifiedTopology: true
})
    .then(() => console.log("connection successful"))
    .catch((err) => { console.log(err) })

//creating the structure of the DB through schemas
const doc = new mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    mrp: Number,
    discount: Number,
    rating: Number,
    category:String,
    Thumbnail:String,
    demo:String,
    Partner: String,
    active: Boolean,
    age: Number,
    adress: String
})

//models (means creating collections)
const mod1 = new mongoose.model("first", doc)  //"first" is the name of collection

app.post('/update',(req,res)=>{
const {oldmrp,newmrp}=req.body
const updateddoc = async () => {
    const res= await mod1.updateOne({mrp:`${oldmrp}`},{$set:{mrp:`${newmrp}`}})
    res.json({"message":"data stored"})
    //console.log(res)
 }
 updateddoc();
})


// //read the document
// const finddoc = async () => {
//     await mod1.find()
// }
// finddoc();

//update the document
// const updateddoc = async () => {
//    const res= await mod1.updateOne({name:"ram"},{$set:{name:"ramu"}})
//    console.log(res)
// }
// updateddoc();






//console.log(doc2)

app.listen(4000)
