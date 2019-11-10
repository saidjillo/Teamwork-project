class Employees {

 
    constructor(user) {
        this.client = require("../database");      
        this.createTable();
        // this.dropTable();   
        this.bcrypt = require("bcrypt");
        this.user = user;
        this.createAdmin();
    }

    createTable() {
        this.client.query(
            "CREATE TABLE IF NOT EXISTS employees(userId SERIAL,firstName varchar(255) NOT NULL,lastName varchar(255) NOT NULL,email varchar(255) NOT NULL,password varchar(255) NOT NULL,gender varchar(255) NOT NULL,jobRole varchar(255) NOT NULL,department varchar(255) NOT NULL,address varchar(255) NOT NULL,PRIMARY KEY (userId))");
    }


    createAdmin() {
        // check if table admin exists
 
        this.client.query(
            "SELECT  * FROM employees WHERE jobrole='admin'", (err, result)=>{

                if( result.rowCount > 0) {
                    console.log("Admin already exists");

                } else {
                    // create table admin
                    let params = [
                        "Andela","DevC","AndelaDevC@gmail.com","AndelaDevC2019","male",'admin',"ICT", 
                        "2555858888"];
        
                   this.client.query( 
                    'INSERT into employees (firstName, lastName, email, password, gender, jobRole, department, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING userId', 
                     params, (err, res)=>{

                        if(err) {
                            console.log("We could not create admin user");
                        } else {
                            console.log("Admin created successfully");
                        }

                     })

                    console.log("Please Create table admin")
                }
            }
        )
    }



    // dropTable() {
    //     this.client.query("DROP TABLE employees", (err, res)=>{
    //         console.log("ERROR ==> " + err);
    //         console.log("RESPONSE ==> " + res);
    //     })
    // }



    // create employees and save into the databse
    async save() {

        let hash = await this.bcrypt.hash(this.user.password, 10);

        let params = [this.user.firstName,
            this.user.lastName,this.user.email, 
            hash, this.user.gender, 
            this.user.jobRole,this.user.department, 
            this.user.address];

           let result = await this.client.query( 
            'INSERT into employees (firstName, lastName, email, password, gender, jobRole, department, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING userId', 
             params);

    
            try {
                let userFetched = result.rows[0].userid;
                let res = await this.client.query("SELECT * FROM employees WHERE userid = $1", [userFetched]);
                return res.rows[0];

            } catch (error) {
                return {
                    error: "Employee could not be created correctly."
                }
            }
                                
    }

    // isAdmin() {
    
    // }


}


module.exports = Employees;