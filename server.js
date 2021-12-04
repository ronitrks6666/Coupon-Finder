const express =  require("express")
const app = express()
const path = require('path')
const ejs = require('ejs')
const mongoose= require('mongoose')






// mongo connection
// const url = 'mongodb+srv://admin:password@cluster0.kcytx.mongodb.net/firstdatabase?retryWrites=true&w=majority'
const url = ''
const connectDB = async ()=>{
    try{
const con = await mongoose.connect(url,{
    useNewUrlParser:true, 
    useUnifiedTopology:true,
    
})
console.log('MongoDB connected :] ')
    }catch(err){
    console.log(err);
    process.exit(1);
    }
}

connectDB();


app.use(express.urlencoded({
    extended:false,
}))
// enable json reading for express
app.use(express.json()) 



app.set("view engine","ejs") 


app.use('/css',express.static(path.resolve(__dirname,'assets/css'))) 
app.use('/js',express.static(path.resolve(__dirname,'assets/js'))) 
app.use('/img',express.static(path.resolve(__dirname,'assets/img'))) 
app.use('/',require('./server/routes/route'))

app.listen(3000,()=>{
    console.log("The server is running :] ")
})



