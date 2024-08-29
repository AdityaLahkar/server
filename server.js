const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const Post = require("./models/Post")
require('dotenv').config()


const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected!'));


app.get('/', async (req, res) => {
    const post = await Post.find({})
    res.json({
        posts: post,
    });
  });

app.post("/", async (req, res)=>{
    const {title,summary} = req.body;
    //TODO
    const post = new Post({title,summary})
    await post.save()
    const posts = await Post.find({})
    res.json({
        success: true,
        post: posts
    });
});

app.put("/:id", async (req,res)=> {
    const id = req.params.id;
    const{title,summary} = req.body;
    await Post.findByIdAndUpdate(id, {title,summary})
    const posts = await Post.find()
    res.json({
        success: true,
        posts: posts,
    });
})

app.delete("/:id", async (req,res)=>{
    const id = req.params.id
    await Post.findByIdAndDelete(id)
    const posts = await Post.find()
    res.json({
        posts,
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



