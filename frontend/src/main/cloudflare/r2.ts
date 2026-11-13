import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  S3ClientConfigType,
} from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const r2Client: S3Client = new S3Client({
  region: `${process.env.CLOUDFLARE_REGION}`,
  endpoint: `${process.env.CLOUDFLARE_ENDPOINT}`,
  credentials: {
    accessKeyId: `${process.env.CLOUDFLARE_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.CLOUDFLARE_SECRET_ACCESS_KEY}`,
  },
});

export async function newListBucketsCommand() {
  const input = {
    MaxBuckets: 1,
  };

  const command = new ListBucketsCommand(input);
  const response = await r2Client.send(command);
  try {
  } catch {}
  await r2Client.send(new ListBucketsCommand({}));
}

// {
//     '$metadata': {
//     httpStatusCode: 200,
//         requestId: undefined,
//         extendedRequestId: undefined,
//         cfId: undefined,
//         attempts: 1,
//         totalRetryDelay: 0
// },
//     Buckets: [
//     { Name: 'user-uploads', CreationDate: 2022-04-13T21:23:47.102Z },
//     { Name: 'my-bucket-name', CreationDate: 2022-05-07T02:46:49.218Z }
//     ],
//     Owner: {
//         DisplayName: '...',
//         ID: '...'
//     }
// }

export async function newListObjectsV2Command() {
  return await r2Client.send(new ListObjectsV2Command({ Bucket: 'autodraft' }));
}

// {
//     '$metadata': {
//       httpStatusCode: 200,
//       requestId: undefined,
//       extendedRequestId: undefined,
//       cfId: undefined,
//       attempts: 1,
//       totalRetryDelay: 0
//     },
//     CommonPrefixes: undefined,
//     Contents: [
//       {
//         Key: 'cat.png',
//         LastModified: 2022-05-07T02:50:45.616Z,
//         ETag: '"c4da329b38467509049e615c11b0c48a"',
//         ChecksumAlgorithm: undefined,
//         Size: 751832,
//         StorageClass: 'STANDARD',
//         Owner: undefined
//       },
//       {
//         Key: 'todos.txt',
//         LastModified: 2022-05-07T21:37:17.150Z,
//         ETag: '"29d911f495d1ba7cb3a4d7d15e63236a"',
//         ChecksumAlgorithm: undefined,
//         Size: 279,
//         StorageClass: 'STANDARD',
//         Owner: undefined
//       }
//     ],
//     ContinuationToken: undefined,
//     Delimiter: undefined,
//     EncodingType: undefined,
//     IsTruncated: false,
//     KeyCount: 8,
//     MaxKeys: 1000,
//     Name: 'my-bucket-name',
//     NextContinuationToken: undefined,
//     Prefix: undefined,
//     StartAfter: undefined
//   }
