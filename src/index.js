import Connect_DB from "./db/index.js";
import express from 'express'
import {app} from './app.js'

const port= process.env.PORT || 4000


Connect_DB().then(()=>{
    app.listen(port, (err)=>{
        if(err){
            console.log("Error 1121",err)
        }else{
            console.log(`Server is running on port ${port}`)
        }
    })
}).catch((err) =>{
    console.log("failed to connect to db",err)
})