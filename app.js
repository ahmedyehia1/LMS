const express = require("express")
const fs = require('fs')

const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'pug')
app.use('/static', express.static('./node_modules/bootstrap/dist'))
// app.use('/sourceCode', express.static('./'))

app.get('/', (req,res) => {
    res.render('home')
})

// routing middleware
app.use('/',require("./routes/courses"))
app.use('/',require("./routes/students"))

app.get('/:t/test',(req,res) => {
    res.send(req.params.t)
})

// creating
// app.get('/web/courses/create', (req,res) => {
//     res.render('Add Course')
// })
// app.get('/web/students/create', (req,res) => {
//     res.render('Add Student')
// })

// source code
app.get('/web/sourceCode', (req,res) => {
    fs.readdir("./", (err,children) => {
        res.render("folder",{children:children,path:['.']})
    })
})
app.get('/web/sourceCode/:file', (req,res) => {
    fs.readdir("./", (err,data) => {
        if(err) throw err;
        let {file} = req.params;
        if(data.find(e => e == file)){
            if(fs.lstatSync(`./${file}`).isFile())
                return fs.readFile(`./${file}`,'utf-8',(err,code) => {res.render("code",{code:code,path:['.',file]})})
                // then it is a folder
                res.render("folder",{children:fs.readdirSync(`./${file}`),path:['.',file]})
        }
        res.render('error',{msg: `file not found`,redirect:'/'})
        })
})
app.get('/web/sourceCode/:folder/:file', (req,res) => {
    fs.readdir("./", (err,data) => {
        if(err) throw err;
        let {folder,file} = req.params;
        if(fs.readdirSync(`./${folder}/`, err => {if(err) throw err}).find(e => e==file) && fs.lstatSync(`./${folder}/${file}`).isFile())
            return fs.readFile(`./${folder}/${file}`,'utf-8',(err,code) => {res.render("code",{code:code,path:[folder,file]})})
        return res.render('error',{msg: `file not found`,redirect:'/'})
    })
})

let port = process.env.port || 3000
app.listen(port,() => {console.log(`listening to port ${port}`)})