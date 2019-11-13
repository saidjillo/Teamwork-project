const Gif = require("../models/gifs");

const gif = new Gif();

exports.createGif = (req,res,next) =>{
 
    let gif_obj = {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    };


    gif.save(gif_obj)
        .then( (item)=>{
            res.status(201).json({
                status: "success",
                data: {
                    message: "GIF image successfully posted",
                    articleId: item.articleid,
                    createdOn: item.createdon,
                    title: item.title,
                    imageUrl: item.imageUrl,
                }
               
            });
        })

        .catch( (error)=>{
            // error message
            res.status(400).json({
                status: "error",
                error: "GIF image could not be posted"                
              })
        });
    
 
};