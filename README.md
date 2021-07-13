<p align="center">
  <a href="https://forwardigital.co.uk/" target="blank"><img src="https://forwardigital.co.uk/logos/logo.svg" width="350" alt="Forward Digital Logo" /></a>
</p>

# S3 Storage with Node.js Example App
This project demonstrates how you can use S3 object storage providers like Vultr, AWS and Digital Ocean in Node.js. 

I would recommend reading [my blog post](https://forwardigital.co.uk/blog/using-an-s3-object-storage-provider-in-nodejs) explaining how it works first.

<br />

## Running the app
The app uses dotenv environment variables to store your S3 bucket credentials. You will need to create a ``.env`` file in the root of the project. 

The ``.env`` file should look like the following:
```js
S3_BUCKET_NAME=your_bucket_name // e.g my-bucket
S3_ENDPOINT_URL=your_endpoint_url // e.g https://eu.amazons3.com/
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_access_key
```

Once you have created the environment you will be able to install and run the project:
```js
> npm install
> npm start
```

<br />

## Using the app
The code for interacting with the S3 object storage is framework agnostic. This code is all held inside the ``objectStorage``
directory. However to demonstrate how to use the functions I have used Express and Multer to create a couple of endpoints
that will upload and delete a file.

### Upload Endpoint
URL: ``POST http://localhost:3000/upload``

Request should be form-data and the file should have the key ``formFile``. A quick HTML form example:
```html
<form action="http://localhost:3000/upload" method="post">
    <input type="file" name="formFile" />
    <input type="submit" value="Submit">
</form>
```

This will upload the file with the name ``my-custom-filename.xxx``

<br />

### Delete Endpoint

URL: ``DELETE http://localhost:3000/delete?filename=xxxx&path=xxxx``

Query Parameters:

``filename`` - the name of the file in the bucket. In the example above it will be ``my-custom-filename.xxx``

``path`` - This is optional. If you want to delete a file within a subdirectory, this should be the path to that directory, e.g ``images/logos``
