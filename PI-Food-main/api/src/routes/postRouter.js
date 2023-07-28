const { Router } = require('express');
const postRouter = Router();
const createPostHandler = require("../handlers/posthandlers")

postRouter.get("/", (req, res) =>{
    res.send("estoy en post")
});

postRouter.post("/", createPostHandler);



module.exports= postRouter;