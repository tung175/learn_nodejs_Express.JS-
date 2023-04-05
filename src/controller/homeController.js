import render  from "ejs";
import pool from "../configs/connectDB";
import multer from "multer";
import path from 'path'
let getHomepage = async (req, res) => {
    //logic
    let data = [];
    // connection.query(
    //     'SELECT * FROM `users` ',
    //     function (err, results, fields) {
    //         results.map((row) => {
    //             data.push({
    //                 id: row.id,
    //                 email: row.email,
    //                 address: row.address,
    //                 fName: row.fName,
    //                 lName: row.lName
    //             })

    //         });

    //         // return res.render('index.ejs', { dataUser: data })

    //     })

        const [rows, fields] = await pool.execute('SELECT * FROM users');
        return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage = async (req , res) => {
    var userId = req.params.id;
    // console.log("check: ", req.params);
    // console.log("check id:", id);
    let [user, fields ] = await pool.execute('SELECT * FROM `users` WHERE `id` = ? ', [userId]);

    // console.log("check: ", user );
    return res.send(JSON.stringify(user))
    // return res.send('detail page')
    
}

let createNewUser = async (req, res) =>{

    let {firstName, lastName, email, address} = req.body
    console.log("check req", req.body);

    await pool.execute(`INSERT INTO users (fName, lName, email, address) values (?, ?, ?, ?)`, [firstName, lastName, email, address])


    return res.redirect('/')
    return res.send('call post createNewUser')

}

let deleteUser = async (req, res) =>{
    let userId = req.body.userId
    await pool.execute('delete FROM `users` WHERE `id` = ?', [userId])
    return res.redirect('/')

}

let editUser = async (req, res) =>{
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM `users` WHERE `id` = ? ', [id])
    // return res.send(JSON.stringify(user))
    return res.render('update.ejs', {dataUser: user[0]})
    // return res.redirect('/')
    
}

let updateUser = async (req, res) =>{
    let {firstName, lastName, email, address, id} = req.body
    // console.log(req.body);
    await pool.execute('update users set fName = ?, lName = ?, email = ?, address = ? where id = ? ', 
    [firstName, lastName, email, address, id])
    return res.redirect('/')
    

}

let getUploadFile = async (req, res) =>{
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) =>{
    
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
   
}

let handleUploadMutipleFiless = async (req, res) =>{

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
    
        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
    
}

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editUser, updateUser ,getUploadFile, handleUploadFile, 
    handleUploadMutipleFiless

}