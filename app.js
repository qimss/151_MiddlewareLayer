import express from "express";
import pg from "pg";
import Joi, { forbidden } from "joi";

const app = express();
const port = 3000;
const {Pool} = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Mahasiswa',
    password: 'ahmed',
    port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next) => {
    const start = Date.now()

    res.on('finish', () =>{
        const duration = Date.now() - start

        console.log({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration} ms`
        })
    })
    next()
})

function successResponse(res, message, data, status = 200){
    return res.status(status).json({
        success: true,
        message,
        data,
        error: null
    })
}
