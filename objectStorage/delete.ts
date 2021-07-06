import {DeleteObjectOutput, DeleteObjectRequest} from 'aws-sdk/clients/s3';
import {AWSError} from 'aws-sdk/lib/error';
import * as S3 from 'aws-sdk/clients/s3';
import Connect from './connection';

/**
 *
 * @param bucket - The name of your bucket (This will be the name you used when setting up with your storage provider)
 * @param objectName - The name that you want to use to store the file (must include file extension)
 * @param path - defaults to the root of your bucket, or provide a path to a directory if the file is stored in a subdirectory
 * @constructor
 * @returns - S3 delete object output response (More info: https://amzn.to/3xmHoi3)
 */
export default async function Delete(bucket: string, objectName: string, path: string | null = null): Promise<DeleteObjectOutput> {
    return new Promise<DeleteObjectOutput>((resolve, reject) => {
        const s3: S3 = Connect(path);
        const params: DeleteObjectRequest = { Bucket: bucket, Key: objectName };
        s3.deleteObject(params, (err: AWSError, data: DeleteObjectOutput) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
