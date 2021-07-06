import { PutObjectOutput, PutObjectRequest } from 'aws-sdk/clients/s3';
import {AWSError} from 'aws-sdk/lib/error';
import * as S3 from 'aws-sdk/clients/s3';
import Connect from './connection';

/**
 * Uploads a file to your bucket in either the root or a subdirectory
 * In this example we are making all objects publicly accessible by using the ACL 'public-read'. If you want to make
 * the file private or use a different access policy then you can read more about canned ACLs here: https://amzn.to/2UoGMdh
 *
 * @param bucket - The name of your bucket (This will be the name you used when setting up with your storage provider)
 * @param file - The file you wish to upload
 * @param objectName - The name that you want to use to store the file (must include file extension)
 * @param path - defaults to the root of your bucket, or provide a path to a directory if you wish to store file in a subdirectory
 * @constructor
 * @returns - The full url of the uploaded file
 */
export default async function Upload(bucket: string, file: Express.Multer.File, objectName: string, path: string | null = null): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const s3: S3 = Connect(path);
        const params: PutObjectRequest = { Bucket: bucket, Key: objectName, Body: file.buffer, ACL: 'public-read', ContentType: file.mimetype };
        s3.putObject(params, (err: AWSError, data: PutObjectOutput) => {
            if (err) reject(err);
            resolve(`${process.env.S3_ENDPOINT_URL}${bucket}/${path}/${objectName}`);
        });
    });
}
