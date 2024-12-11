const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Assuming a PostgreSQL pool is already set up
const { Client } = require('pg'); // For creating a new database

// Helper function to generate a unique UUID
const generateUniqueUUID = async (column, table) => {
    let uniqueUUID;
    let exists;
    do {
        uniqueUUID = uuidv4();
        const query = `SELECT COUNT(*) FROM ${table} WHERE ${column} = $1`;
        const result = await pool.query(query, [uniqueUUID]);
        exists = parseInt(result.rows[0].count, 10) > 0;
    } while (exists);
    return uniqueUUID;
};


// API to create a company
exports.createCompany = async (req, res) => {
    try {
        const { companyname, useruuid } = req.body;
        console.log(companyname, useruuid);
        if (!companyname || !useruuid) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Ensure the "companylist" table exists
        await pool.query(`
      CREATE TABLE IF NOT EXISTS companylist (
        sno SERIAL PRIMARY KEY,
        comuuid UUID NOT NULL,
        useruuid UUID NOT NULL,
        companyname VARCHAR(255) NOT NULL
      )
    `);


        const checkQuery = `
    SELECT * FROM companylist
    WHERE useruuid = $1 AND companyname = $2
  `;
        const checkResult = await pool.query(checkQuery, [useruuid, companyname]);

        if (checkResult.rowCount > 0) {
            return res.status(409).json({ message: 'Company already registered' });
        }
        // Generate a unique UUID for the company
        const comuuid = await generateUniqueUUID('comuuid', 'companylist');

        // Insert company data into the "companylist" table
        const insertQuery = `
      INSERT INTO companylist (comuuid, useruuid, companyname)
      VALUES ($1, $2, $3)
    `;
        await pool.query(insertQuery, [comuuid, useruuid, companyname]);

        // Create a new database named after the company UUID
        // const adminClient = new Client({
        //     user: process.env.DB_USER,
        //     host: process.env.DB_HOST,
        //     password: process.env.DB_PASSWORD,
        //     port: process.env.DB_PORT,
        // });

        // await adminClient.connect();

        // try {
        //     const createDbQuery = `CREATE DATABASE "${comuuid}"`;
        //     await adminClient.query(createDbQuery);
        //     console.log("try")

        // } catch (dbError) {
        //     console.log("catch")
        //     if (dbError.code === '42P04') {
        //         // Code for "database already exists"
        //         console.log('Database already exists');
        //     } else {
        //         throw dbError;
        //     }
        // } finally {
        //     console.log("finally")
        //     await adminClient.end();
        // }

        res.status(201).json({ message: 'Company created successfully', comuuid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.AllCompanys = async (req, res) => {
    try {
        const { useruuid } = req.params;
        console.log(useruuid);
        const checkQuery = `
    SELECT * FROM companylist WHERE useruuid = $1
`;

        const checkResult = await pool.query(checkQuery, [useruuid]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "No companies found for this user" });
        }
        res.status(200).json({ success: true, data: checkResult.rows });
    }
    catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching companies" });
    }
}
exports.Companys = async (req, res) => {
    try {
        const { useruuid } = req.params;
        const { companyname, take , skip } = req.query;

        console.log("useruuid", useruuid, "companyname", companyname, "take", take, "skip", skip);

        // Validate `useruuid` format
        if (!useruuid) {
            return res.status(400).json({ message: 'Invalid User UUID format' });
        }

        // Validate and parse `take` and `skip`
        const takeCount = parseInt(take, 10);
        const skipCount = skip || 0;
console.log("takeCount :- ",takeCount ,"skipCount" , skipCount )
        if (isNaN(takeCount) || isNaN(skipCount)) {
            return res.status(400).json({ message: 'Invalid pagination values' });
        }

        // Build SQL query
        let query = `SELECT * FROM companylist WHERE useruuid = $1`;
        const queryParams = [useruuid];
        const totalData = await pool.query(query, queryParams)
        const lengthTotalData = totalData.rows.length;
        if (companyname) {
            query += ` AND LOWER(companyname) LIKE $2`;
            queryParams.push(`%${companyname.toLowerCase()}%`);
        }

        query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
        queryParams.push(takeCount, skipCount);

        console.log("Executing query:", query, "with params:", queryParams);

        // Execute query
        const results = await pool.query(query, queryParams);

        if (results.rows.length === 0) {
            return res.status(404).json({ message: "No companies found for the given criteria" });
        }

        res.status(200).json({  dataCount:lengthTotalData , success: true, data: results.rows });
    } catch (error) {
        console.error('Error fetching user companies:', error);
        res.status(500).json({ message: 'An error occurred while fetching companies' });
    }
};
// exports.Companys = async (req, res) => {
//     try {
//         const { useruuid } = req.params;
//         const { companyname, take = 5, skip = 0 } = req.query;

//         console.log("useruuid",useruuid ,"companyname",companyname,"take",take,"skip",skip)
//         // Validate `useruuid` format
//         if (!useruuid) {
//             return res.status(400).json({ message: 'Invalid User UUID format' });
//         }

//         // Validate and parse `take` and `skip`
//         const takeCount = parseInt(take, 10);
//         const skipCount = parseInt(skip, 10);

//         if (isNaN(takeCount) || isNaN(skipCount)) {
//             return res.status(400).json({ message: 'Invalid pagination values' });
//         }

//         // Build SQL query
//         let query = `SELECT * FROM companylist WHERE useruuid = ?`;
//         const queryParams = [useruuid];

//         if (companyname) {
//             query += ` AND LOWER(companyname) LIKE ?`;
//             queryParams.push(`%${companyname.toLowerCase()}%`);
//         }

//         query += ` LIMIT ? OFFSET ?`;
//         queryParams.push(takeCount, skipCount);

//         // Execute query
//         const results = await pool.execute(query, [queryParams]);

//         res.status(200).json({ data: results });
//     } catch (error) {
//         console.error('Error fetching user companies:', error);
//         res.status(500).json({ message: 'An error occurred while fetching companies' });
//     }
// };