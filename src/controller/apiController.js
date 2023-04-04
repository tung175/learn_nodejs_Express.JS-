import pool from "../configs/connectDB"

let getAllusers = async (req, res) =>{

    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.status(200).json({
        message: 'kyu tung',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let {firstName, lastName, email, address} = req.body
    // console.log("check req", req.body);

    if(!firstName || !lastName || !email || !address){
        return res.status(200).json({
            message: 'missing required params',
        })
    }
    await pool.execute(`INSERT INTO users (fName, lName, email, address) values (?, ?, ?, ?)`, 
        [firstName, lastName, email, address])

    return res.status(200).json({
        message: 'oke',
        
    })
}

let deleteUser = async(req, res) => {
    let userId = req.params.id
    if(!userId){
        return res.status(200).json({
            message: 'missing required params',
        })
    }
    await pool.execute('delete from users where id = ?', [userId])
    return res.status(200).json({
        message: 'oke',
        
    }) 
}

let updateUser = async(req, res) => {
    let {firstName, lastName, email, address, id} = req.body

    if(!firstName || !lastName || !email || !address || !id){
        return res.status(200).json({
            message: 'missing required params',
        })
    }

    // console.log(req.body);
    await pool.execute('update users set fName = ?, lName = ?, email = ?, address = ? where id = ? ', 
    [firstName, lastName, email, address, id])

    return res.status(200).json({
        message: 'oke',
        
    })
}

module.exports = {
    getAllusers, createNewUser, updateUser, deleteUser
}