const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employees = require("../models/employees");


exports.signup = (req, res, next)=>{
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        jobRole: req.body.jobRole,
        department: req.body.department,
        address: req.body.address,
    };

    const employee = new Employees(user);
    
    employee.save()
        
        .then( (result)=>{
            console.log("Result is ==> :" + result);
            res.status(201).json( {
                status: "success",
                data: {
                    message: "User account successfully created",
                    token: "string",
                    userId: result.userid,
                    firstName: result.firstname,
                    lastName: result.lastName,
                    email: result.email,
                    gender: result.gender,
                    jobRole: result.jobRole,
                    department: result.department,
                    address: result.address
                },
        
            });
        })

        .catch( (error)=>{
            console.log("ERROR IS ==> :"+ error);
            res.status(500).json({
                status: "unsuccessful",
                error: error
            });
        });

};

