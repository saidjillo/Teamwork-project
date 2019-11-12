const Article = require('../models/articles');

const article = new Article();


exports.createArticle = (req,res,next) =>{
 
        let data_obj = {
            title: req.body.title,
            article: req.body.article,
            userId: req.body.userId
        };


        article.save(data_obj)
            .then( (item)=>{
                res.status(201).json({
                    status: "success",
                    data: {
                        message: "Article successfully posted",
                        articleId: item.articleid,
                        createdOn: item.createdon,
                        title: item.title,
                        article: item.article,
                        error: false
                    }
                   
                });
            })

            .catch( (error)=>{
                res.status(400).json({
                    status: "unsuccessful",
                    data: {
                        message: "Article could not posted",
                        articleId: "",
                        createdOn: "",
                        title: "",
                        article: "",
                        error: error
                    }
                  })
            });
        
     
};