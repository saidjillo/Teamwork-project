class Articles {

 
    constructor() {
        this.client = require("../database");      
        this.createTable();
        // this.dropTable();   
    }

    // create table articles if it does not exist
    createTable() {
        this.client.query(
            "CREATE TABLE IF NOT EXISTS articles(articleId SERIAL,title varchar(255) NOT NULL,article varchar(3000) NOT NULL,createdOn varchar(255) NOT NULL ,createdBy int NOT NULL,PRIMARY KEY (articleId))");
    }

    // drop table articles ---- ONLY FOR DEVELEOPMENT PURPOSES AND SHOULD NOT BE USED IN PRODUCTION
    dropTable() {
        console.log("DELETING TABLE....");
        this.client.query("DROP TABLE articles", (err, res)=>{
            console.log("ERROR ==> " + err);
            console.log("RESPONSE ==> " + res);
        })
    }


    // create new article and save into the databse
    async save(article_obj) {


        let date = new Date();
        let params = [article_obj.title,
            article_obj.article, 
            date.toDateString(),
            article_obj.userId];

        console.log("waiting......");

        let result =  await this.client.query( 
            'INSERT into articles (title, article, createdOn, createdBy) VALUES($1, $2, $3, $4) RETURNING articleId', 
             params);

        console.table(article.rows[0]);
        
        let id =  result.rows[0].articleid;
        let article = this.client.query("SELECT * FROM articles WHERE articleid = $5", [id]);
        
        console.table("waiting......" + article.rows[0]);
        return article.rows[0];
       
                                      
    }

    // return one article from the database
    async findOne(id){
     
        let article = await this.client.query("SELECT * FROM articles WHERE articleId= $1", [id]);
        console.log("The returned user is ==>: "+ article.rows[0]);
        return article.rows[0];

    }

    // Update and return one article from the database
    async updateOne(id, article){
        this.client.query(
            "UPDATE articles SET title=($1), article=($2) WHERE articleId=($3)",
            [article.title, article.article, id], (err, res)=>{
                let modified_article =  this.client.query("SELECT * FROM articles WHERE articleId= $4", [id]);
                return modified_article.rows[0];
            })
    }

    // delete one article from the database with the specified id
    async deleteOne(id) {
        this.client.query("DELETE FROM articles WHERE articleId = $1", [id]);
    }


    // return all articles from database order by most recent items
    async find() {
        let articles = await this.client.query("SELECT * FROM articles ORDER BY createdOn");
        return articles.rows;
    }


}


module.exports = Articles;