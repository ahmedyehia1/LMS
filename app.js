const express = require("express")

const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'pug')
app.use('/static', express.static('./node_modules/bootstrap/dist'))

app.get('/', (req,res) => {res.render('home')})

// routing middleware
app.use('/',require("./routes/courses"))
app.use('/',require("./routes/students"))
app.use('/web/sourceCode',require("./routes/sourceCode"))

let port = process.env.port || 3000
app.listen(port,() => {console.log(`listening to port ${port}`)})