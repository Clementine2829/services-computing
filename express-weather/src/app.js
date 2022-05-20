
const path = require("path")

const express = require("express")
const app = express();

const router = require("./router")

app.use(express.urlencoded({ extended: false })) // for basic configuration 
app.use(express.json()) // parse any json data
app.use(express.static("public")) // telling express to gain access to everything in the public folder
app.set("views", "views") // render views, install views for it to be live
app.set("view engine", "hbs") //tell express to use this engine that we just inalled 

app.use("/", router)

app.listen(3000, () => { console.log("server is now running on port 3000") })

