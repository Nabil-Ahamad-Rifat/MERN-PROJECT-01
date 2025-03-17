const express = require('express');
const app = express();
const path=require("path");
const fs=require("fs");


app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join((__dirname,"public"))));



app.get("/",(req,res)=>{
    fs.readdir("./file",(err,file)=>{
        console.log(file);
        res.render("index",{file:file});
    })
})

app.post("/create",(req,res)=>{
    console.log(req.body);
    fs.writeFile(`./file/${ req.body.tittle.split(" ").join("")}.txt`,req.body.details,(err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/");
    })
});

app.get("/file/:filename",(req,res)=>{
    fs.readFile(`./file/${req.params.filename}`,"utf-8",(err,filedata)=>{
        if(err){
            console.log(err)
        }
        res.render("show",{filename:req.params.filename,filedata: filedata});

    });
})




app.get("/edit/:filename",(req,res)=>{
    res.render("edit",{filename:req.params.filename});
})



app.post("/edit",(req,res)=>{
    console.log(req.body)
    fs.rename(`./file/${req.body.prevoiusname}`,`./file/${req.body.newname}`,(err)=>{
        if(err){
            console.log(err);
            
        }
        res.redirect("/");
    });
});


app.post("/delete/:filename", (req, res) => {
    fs.unlink(`./file/${req.params.filename}`, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error deleting file");
        }
        // res.redirect("/");
    });
});


app.listen(8080,(error)=>{
    if(error){
        console.log(error);
    }
    console.log("server run in 8080");
})