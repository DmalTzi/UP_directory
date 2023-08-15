const express = require('express')
const router = express.Router()
const Data = require("../model/Data")
const StudentData = require('../model/StudentData')
const fun = require("./function")


router.get("/",(req,res)=>{
    res.render("index")
})

router.get("/admin", (req,res)=>{
    fil_topic = req.query.Topic_show
    console.log(fil_topic)
    Data.find().then((result) => {
        if (fil_topic == undefined || fil_topic == "All"){
            res.render("admin", {data:result})
        }else if(fil_topic == "false"){
            Data.find({"Detail.SendStatus":fil_topic}).then((result) => {
                res.render("admin", {data:result})
            });
        }else if(fil_topic == "true"){
            Data.find({"Detail.SendStatus":fil_topic}).then((result) => {
                res.render("admin", {data:result})
            });
        }else{
            res.render("admin", {data:result})
        }
    }).catch((err) => {
        console.log(err)
    });
})

router.get("/admin/:serial", (req,res)=>{
    let serial_name = req.params.serial
    Data.findOne({"Detail.Serial":serial_name}).then((result) => {
        res.render("detail", {item:result})
    })
})

router.post("/approve", (req,res)=>{
    let update_id = req.body.update_id
    console.log("update_id : ",update_id)
    let data = {
        StudentNumber:req.body.StudentNumber,
        StudentName:req.body.StudentName,
        Room:req.body.Room,
        Number:req.body.Number,
        Symptom:req.body.symptom,
        Age:req.body.Age,
        Weight:req.body.Weight,
        Cause:req.body.Cause,
        Range:req.body.Range,
        Temp:req.body.Temp,
        Date_poo:req.body.Deta_poo,
        Time_poo:req.body.Time_poo,
        Poo_time:req.body.Poo_time,
        Detail:{
            Serial:req.body.Serial,
            SendBy:"อนุมัติโดยครู",
            SendStatus:true,
            Time:req.body.Time,
            date:req.body.date},
    }
    Data.findByIdAndUpdate(update_id, data, {useFindAndModify:false}).exec(err=>{
        res.redirect(`/admin?Topic_show=${fil_topic}`)
    })

    // console.log(update)
})

router.post("/student_sign_in",(req,res)=>{
    console.log(req.body)
    studentnumber = req.body.StudentNumber
    studentclassroom = Number([req.body.Class,'0',req.body.Room].join(''))
    numberstudent = req.body.Number
    StudentData.findOne({"StudentNumber":Number(req.body.StudentNumber)}).then((result) => {
        console.log(studentnumber, studentclassroom, numberstudent)
        console.log(result)
        if (result != null){
            if (studentnumber == result.StudentNumber && studentclassroom == result.Room && numberstudent == result.Number){
                res.render("select")
            }else{
                res.render("404")
            }
        }else{
            res.render("404")
        }
    }).catch((err) => {
        console.log(err)
    });
})

router.get("/student_sign_in/:symptom", (req,res)=>{
    let name_symptom = req.params.symptom
    if (name_symptom == "headache"){res.render('headache')}
    else if (name_symptom == "fever"){res.render('fever')}
    else if (name_symptom == "men"){res.render('men')}
    else if (name_symptom == "diarrhea"){res.render('diarrhea')}
    else if (name_symptom == "urticaria"){res.render('urticaria')}
})

router.post("/update", (req,res)=>{
    if(req.body.Temp >= 38){
        SendBy = "อนุมัติโดยระบบ"
    }else{
        SendBy = "รอครูอนุมัติ"
    }
    StudentData.findOne({"StudentNumber":studentnumber}).then((result) => {
        let data = new Data({
            StudentNumber:studentnumber,
            StudentName:result.StudentName,
            Room:studentclassroom,
            Number:numberstudent,
            Symptom:req.body.Symptom,
            Age:req.body.Age,
            Weight:req.body.Weight,
            Cause:req.body.Cause,
            Range:req.body.Range,
            Temp:req.body.Temp,
            Date_poo:req.body.Deta_poo,
            Time_poo:req.body.time_poo,
            Poo_time:req.body.poo_time,
            Detail:{
                Serial:fun.random_serial(),
                SendBy:SendBy,
                SendStatus:false,
                Time:new Date().toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'}),
                date:fun.formatDate(new Date())},
        })
        Data.save(data)
    })
})


module.exports = router 