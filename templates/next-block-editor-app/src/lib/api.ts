
import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { FetchHttpHandler } from '@smithy/fetch-http-handler'

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET
const region = process.env.NEXT_PUBLIC_S3_REGION
const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID
const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY

const credentials = {
  accessKeyId,
  secretAccessKey,
}

const client = new S3({
  credentials,
  region,
  requestHandler: new FetchHttpHandler({ keepAlive: false }),
})

export class API {
  public static uploadImage = async (_file: File) => {
    if (!_file) {
      throw new Error('No file provided')
    }

    const key = `tiptap/${Date.now()}-${_file.name}`

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: _file,
      ContentType: _file.type,
    }

    try {
      const upload = new Upload({
        client,
        params,
      })

      await upload.done()

      return `${process.env.NEXT_PUBLIC_S3_GETFILE_URL}${upload?.singleUploadResult?.Key}`
    } catch (error) {
      console.error('Error uploading file:', error)
      throw new Error('File upload failed')
    }
  }
}

export default API
