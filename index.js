const express = require('express');
const mongoose= require('mongoose');
const Article= require('./models/article');
const articleRouter= require('./routes/articles');
const methodOverride = require('method-override')
const app= express();

//blogDB is the name of our database
mongoose.connect('mongodb://localhost/blogDB',{
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine','ejs');   
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))



app.get("/",async (req,res)=>
{
  const articles =  await Article.find().sort({createdAt:'desc'});
  //going to get every single article 

    
res.render('articles/index',{articles: articles});
});
app.use('/articles',articleRouter);
app.listen(3000);