import * as express from 'express';
import { Express } from 'express';
import * as dotenv from 'dotenv';
import * as multer from "multer";
import Upload from "./objectStorage/upload";
import Delete from "./objectStorage/delete";

dotenv.config();
const app: Express = express();
const port: number = parseInt(process.env.PORT) || 3000;

// Endpoint for uploading a file
app.post(
    '/upload',
    multer().single('formFile'),
    async (req, res) => {
        if(!req.file) res.status(400).send('Bad Request: No file was uploaded');
        // If you want to retain the original filename and extension just use originalname like below
        // const filename: string = req.file.originalname;
        const fileExtension: string = req.file.originalname.split('.').pop();
        const filename: string = `my-custom-filename.${fileExtension}`;
        const url: string = await Upload(process.env.S3_BUCKET_NAME, req.file, filename, 'images/logo');
        res.status(201).send(url);
    });

// Endpoint for deleting file
app.delete(
    '/delete',
    async (req, res) => {
        const filename: string | null = req.query.filename?.toString();
        if(!filename) res.status(400).send('Bad Request: You must supply the \'filename\' query parameter');
        const pathToFile: string | null = req.query.path?.toString();
        await Delete(process.env.S3_BUCKET_NAME, filename, pathToFile);
        res.status(200).send();
    });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
