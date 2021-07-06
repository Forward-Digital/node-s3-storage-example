import * as S3 from 'aws-sdk/clients/s3';

/**
 * Connects to an S3 object storage instance using credentials and returns an S3 connection
 *
 * @param path - defaults to the root of the bucket, specify a path here if you wish to connect to a subdirectory
 * @constructor
 * @returns - S3 connection instance
 */
export default function Connect(path: string | null = ''): S3 {
    return new S3({
        apiVersion: 'latest',
        endpoint: `${process.env.S3_ENDPOINT_URL}${path}`,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY,
        },
    });
}
