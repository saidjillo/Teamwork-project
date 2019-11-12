class Gif {

 
    constructor() {
        this.client = require("../database");      
        this.createTable();
        // this.dropTable();   
    }

    // create table gifs if it does not exist
    createTable() {
        this.client.query(
            "CREATE TABLE IF NOT EXISTS gifs(gifId SERIAL,title varchar(255) NOT NULL,imageUrl varchar(3000) NOT NULL,createdOn varchar(255) NOT NULL ,createdBy int NOT NULL,PRIMARY KEY (gifId))");
    }

    // drop table articles ---- ONLY FOR DEVELEOPMENT PURPOSES AND SHOULD NOT BE USED IN PRODUCTION
    dropTable() {
        console.log("DELETING TABLE....");
        this.client.query("DROP TABLE gifs", (err, res)=>{
        })
    }


    // create new article and save into the databse
    async save(gif_obj) {


        let date = new Date();
        let params = [gif_obj.title,
            gif_obj.imageUrl, 
            date.toDateString(),
            gif_obj.userId];

        let result =  await this.client.query( 
            'INSERT into gifs (title, imageUrl, createdOn, createdBy) VALUES($1, $2, $3, $4) RETURNING gifId', 
             params);
        
        let id =  result.rows[0].gifId;
        let gif = this.client.query("SELECT * FROM gifs WHERE gifId = $5", [id]);
        
        return gif.rows[0];
       
                                      
    }


    // return one article from the database
    async findOne(id){
     
        let gif = await this.client.query("SELECT * FROM gifs WHERE gifId= $1", [id]);
        return gif.rows[0];

    }



    // Update and return one article from the database
    async updateOne(gif){
        this.client.query(
            "UPDATE gifs SET title=($1), imageUrl=($2) WHERE gifId=($3)",
            [gif.title, gif.imageUrl, gif.userId], (err, res)=>{
                let modified_gif =  this.client.query("SELECT * FROM gifs WHERE gifId= $4", [gif.userId]);
                return modified_gif.rows[0];
            })
    }



    // delete one article from the database with the specified id
    async deleteOne(id) {
        this.client.query("DELETE FROM articles WHERE gifId = $1", [id]);
    }


    // return all articles from database order by most recent items
    async find() {
        let gifs = await this.client.query("SELECT * FROM gifs ORDER BY createdOn");
        return gifs.rows;
    }


}


module.exports = Gif;