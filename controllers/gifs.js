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
                    articleId: item.gifid,
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


exports.deleteGif = (req, res, next)=>{
              
    gif.deleteOne(req.params.gifId)

    .then( ()=>{
        res.status(201).json({
            status: "success",
            data: {
                message: "GIF image successfully deleted",
            }
        });
    })

    .catch( (error)=>{
        res.status(404).json({
            status: "error",
            data: {
                message: "GIF image could not be deleted",
            }
        })
    });

};


exports.getAllGifs = (req,res,next)=>{

    gif.find()

        .then( (items)=>{
            // loop through all items
        })

        .catch( (error)=>{
            res.status(400).json({
                status: "error",
                error: "GIF images could not be fetched."                
              })
        });


};