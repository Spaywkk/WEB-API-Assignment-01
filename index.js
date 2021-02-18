const MongoClien  =  require('mongodb').MongoClient //ใช้ mongodb
const express = require('express') //ใช้ express

const app = express()
const url = 'mongodb+srv://superadmin:TYHJhpP6fUiuELVe@cluster0.jtsb5.mongodb.net/sample_weatherdata?retryWrites=true&w=majority'
const client = new MongoClien(url , { useNewUrlParser:true , useUnifiedTopology:true}) 

async function connect(){
    await client.connect()
}
connect()

    app.get('/weather',async(req,res) =>{
        try{

            const callLetters = req.query.callLetters
            const qualityControlProcess = req.query.qualityControlProcess

            //http://localhost:3000/data?callLetters=RIGG
            const db = client.db('sample_weatherdata')
            const collection = db.collection('data')
            let query = {}
            if (callLetters){

                query.callLetters = callLetters
            }
            if (qualityControlProcess){

                query.qualityControlProcess=qualityControlProcess
            }
            const cursor = collection.find(query).limit(2)
            let data = []
            await cursor.forEach(doc => data.push(doc.position,
                                                    doc.callLetters,
                                                    doc.airTemperature,
                                                    doc.ts))

            res.send(data)
        }catch(e){
    
            console.log(e)
    
        }

    })

app.listen(3000,console.log('Start Application at port 3000'))




