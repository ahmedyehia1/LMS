const router = require("express").Router();
const fs = require("fs")

let avoided = ['node_modules','data.json','.git','.gitignore']

router.get('/', (req,res) => {
    fs.readdir("./", (err,children) => {
        if(err) throw err;
        children = children.filter(e => !avoided.includes(e))
        res.render("folder",{children:children,path:['.']})
    })
})
router.get('/:file', (req,res) => {
    let {file} = req.params;
    if(avoided.find(e => e == file))
        return res.status(404).render('error',{msg: `file not found`,redirect:'/'})
    fs.readdir("./", (err,data) => {
        if(err) throw err;
        if(data.find(e => e == file)){
            if(fs.lstatSync(`./${file}`).isFile())
                return fs.readFile(`./${file}`,'utf-8',(err,code) => {res.render("code",{code:code,path:['.',file]})})
            // then it is a folder
            return res.render("folder",{children:fs.readdirSync(`./${file}`),path:['.',file]})
        }
        res.status(404).render('error',{msg: `file not found`,redirect:'/'})
        })
})
router.get('/:folder/:file', (req,res) => {
        let {folder,file} = req.params;
        if(fs.readdirSync(`./${folder}/`, err => {if(err) throw err}).find(e => e==file) && fs.lstatSync(`./${folder}/${file}`).isFile())
            return fs.readFile(`./${folder}/${file}`,'utf-8',(err,code) => {res.render("code",{code:code,path:[folder,file]})})
        res.status(404).render('error',{msg: `file not found`,redirect:'/'})
})

module.exports = router;
