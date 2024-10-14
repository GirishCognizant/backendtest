// db.js
const sql = require('mssql/msnodesqlv8');

// MSSQL Configuration
const config = {
    server: 'LTIN527389',
    port: 1433,
    driver: 'SQL Server Native Client 11.0',
    database: 'KITE',
    connectionTimeout: 15000,
    options: {
        encrypt: false,
        trustedConnection: true
    }
};

// MSSQL Pool Connection
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = { poolPromise, config };
