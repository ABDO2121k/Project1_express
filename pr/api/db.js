import mysql from 'mysql2'

export const db=mysql.createConnection({
    host:"localhost",
    database:"blog",
    user:"root",
    password:"Abcd1234@Kouah",
})

