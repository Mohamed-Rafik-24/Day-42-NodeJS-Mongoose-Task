const mongodb = require('mongodb')
const dbName = "newdb"
// const dbName = process.env.DB_NAME
// const dbUrl = process.env.DB_URL

const dbUrl = `mongodb+srv://root:root123@cluster0.kp7xumn.mongodb.net/${dbName}`


module.exports = {mongodb, dbName, dbUrl}