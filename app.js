const express=require('express')
const app=express()
const PORT=process.env.PORT||5500
const path=require('path')
const indexRouter=require('./routes/indexRoute')
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded())

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views"));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
app.use(connectLiveReload());


app.use('/',indexRouter)
app.listen(PORT)