import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'logistic_pharmaceutical',
    port: 3306,
    password: '',
});
async function getConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Database connection succesful");
        return connection;
    }
    catch (err) {
        console.error("Database connection failed: ", err);
        throw err;
    }
}
getConnection();
export { pool };
