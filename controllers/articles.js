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


exports.getOneArticle = (req, res, next)=>{

    article.findOne(req.params.articleId)
    
        
      .then( (item)=>{
          res.status(200).json({
            status: "success",
            data: {
                id: item.articleid,
                createdOn: item.createdon,
                title: item.title,
                article: item.article,
                comments: [
                    {
                        commentId: "",
                        comment: "",
                        authorId: ""
                    },
                ] ,
                error: false
            }
          });
       })
       
       .catch( (error)=>{
          res.status(404).json({
              error: error
          });
       });

};


exports.deleteArticle = (req, res, next)=>{
              
    article.deleteOne(req.params.articleId)

    .then( ()=>{
        res.status(201).json({
            status: "success",
            data: {
                message: "Article successfully deleted",
            }
        });
    })

    .catch( (error)=>{
        res.status(404).json({
            status: "error",
            data: {
                message: "Article could not be deleted",
            }
        })
    });

};


exports.modifyArticle = (req, res, next)=>{

    let request_article = {
        title: req.body.title,
        article: req.body.article,
        userId: req.body.userId
    }

    article.findOne(req.params.articleId)
        .then( (item)=>{
            if(item){
                article.updateOne(request_article)

                    .then( (updated_article)=>{
                        res.status(201).json({
                            status: "success",
                            data: {
                                id: updated_article.articleid,
                                createdOn: updated_article.createdon,
                                title: updated_article.title,
                                article: updated_article.article,
                                comments: [
                                    {
                                        commentId: "",
                                        comment: "",
                                        authorId: ""
                                    },
                                ] ,
                                error: false
                            }
                          });
                    })

                    .catch( (error)=>{
                        res.status(404).json({
                            status: "error",
                            data: {
                                message: "Article could not be updated",
                            }
                        })
                    });


            }else {
                // create new article

                article.save(request_article)
                    .then( (item)=>{
                        res.status(201).json({
                            status: "success",
                            data: {
                                message: "Article successfully posted",
                                articleId: item.articleid,
                                createdOn: item.createdon,
                                title: item.title,
                                article: item.article,
                            }
                        
                        });
                    })
    
                    .catch( (error)=>{
                        res.status(400).json({
                            status: "error",
                            data: {
                                message: "Article could not be posted",
                            }
                        })
                    });

            }
        })

        .catch( (error)=>{
            res.status(404).json({
                status: "error",
                data: {
                    message: "Article could not be found",
                }
            })
        });


};


exports.getAllArticles = (req,res,next)=>{

    article.find()
    
        .then( (items)=>{

        })

        .catch( (error)=>{

        });

};

