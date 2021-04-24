const idGen = require("../idGenerator")
const fs = require('fs')

exports.Get = (req,res,obj) => {
    let {endpoint} = req.params
    let {id} = req.params
    let objs = obj+'s'
    if(endpoint == 'api'){
        if(id){ // get a specific obj element
            let element = data[objs].find(e => e.id == req.params.id)
        if(element)
            return res.send(element)
        return res.status(404).send(`${obj} with id ${req.params.id} not found`)
        }
        return res.send(data[objs]) // get all from objs
    }
    if(endpoint == 'web'){
        if(id){ // get a specific ojb element
            if(id == 'create') // create new course page
                return res.render(`Add ${obj}`)
            let element = data[objs].find(e => e.id == req.params.id)
            if(element)
                return res.render(obj,element)
            return res.status(404).render('error',{msg: `${obj} with id ${req.params.id} not found`})
            }
        let passed = Object()
        passed[objs] = data[objs]
        return res.render(objs,passed) // get all from objs
    }
    return res.status(404).send("url not provided")
}

exports.Create = (req,res,obj,MAX,schema) => {
    let {endpoint} = req.params
    let body = req.body
    let objs = obj+'s'
    body.id = idGen()    // add id generated from a hash function
    let results = schema.validate(body)
    if(results.error){
        if(endpoint == 'api')
            return res.status(404).send(results.error.message)
        if(endpoint == 'web')
            return res.status(404).render('error',{msg:results.error.message,redirect:"/web/students/create"})
    }if(data[objs].length == MAX)
        data[objs].shift()
    data[objs].push(body)
    fs.writeFile("./data.json",JSON.stringify(data), err => {
        if(err) throw err
        if(endpoint == 'api')
            return res.send(body)
        if(endpoint == 'web')
            res.send(res.redirect(`/web/${objs}/${body.id}`))
    })
}


exports.Update = (req,res,obj,schema) => {
    let {endpoint} = req.params
    let objs = obj+'s'
    let {body} = req;
    let results = schema.validate(body)
    if(endpoint == 'api'){
        if(results.error){
            // if(endpoint == 'api')
                return res.status(404).send(results.error.message)
            // if(endpoint == 'web')
            //     return res.status(404).render('error',{msg:results.error.message,redirect:"/web/students/create"})
        }
        let ind = data[objs].findIndex(e => e.id == req.params.id)
        if(ind > -1){
            Object.assign(data[objs][ind],body)
            delete data[objs][ind]._locals;
            return fs.writeFile("./data.json",JSON.stringify(data), err => {
                if(err) throw err
                res.send(data[objs][ind])
            })
        }
        return res.status(400).send(`given id ${req.params.id} not found`)
    }
    res.status(404).send('url not provided')
}

exports.Delete = (req,res,obj) => {
    let {endpoint} = req.params
    let objs = obj+'s'
    if(endpoint == 'api'){
        let ind = data[objs].findIndex(e => e.id == req.params.id)
        if(ind > -1){
            let deleted = data[objs].splice(ind,1)[0];
            delete deleted._locals;
            return fs.writeFile("./data.json",JSON.stringify(data), err => {
                if(err) throw err
                res.send(deleted)
            })
        }
        res.status(400).send(`given id ${req.params.id} not found`)
    }
}