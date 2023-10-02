import FormSubmitButton from "@/components/formSubmitButton";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const metadata = {
  title: "Add product - Nesimaishyk"
}

async function addProduct(formData: FormData) {
  "use server";

  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png']
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);

  const imageArray = [];
  const imageInputFieldCount = 6;

  for (let i = 1; i <= imageInputFieldCount; i++) {
    const imageKey = `image${i}`;
    const image = formData.get(imageKey) as File;

    if (image.size !== 0) {
      if (!validFileTypes.find(type => type === image.type)) {
        throw new Error(`File "${image.name}" format is incorrect.`);
      }

      imageArray.push(image);
    }
  }

  console.log("images: ", imageArray);

  if (!name || !description || !imageArray[0] || !price)
    throw Error("Missing required fields!")

  const signedUrls = await uploadImagesToS3(imageArray);

  for (let index = 0; index < signedUrls.length; index++) {
    const element = signedUrls[index];

    fetch(element, {
      method: 'PUT',
      body: imageArray[index],
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log('PUT request successful:', data);
      })
      .catch(error => {
        console.error('There was a problem with the PUT request:', error);
      });

  }

  const imageUrls: string[] = [];
  imageArray.forEach(element => {
    const imageUrl = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${element.name}`;
    imageUrls.push(imageUrl)
  });

  if (imageUrls!.length > 0) {
    await prisma.product.create({
      data: { name, description, imageUrls: imageUrls, price }
    })
  }


  redirect("/")
}

const uploadImagesToS3 = async (images: File[]) => {
  const imageUrls: string[] = [];
  try {
    const client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
      }
    });

    await Promise.all(images.map(async (image) => {
      const fileBuffer = await image.arrayBuffer();

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.name,
        ContentType: image.type
      });

      const signedUrl: string = await getSignedUrl(client, command, {
        expiresIn: 60000,
      })

      console.log(`Successfully uploaded file. URL: ${signedUrl}`);

      const commandSend = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.name,
        ContentType: image.type
      });

      imageUrls.push(signedUrl);
    }));

    return imageUrls;
  } catch (error) {
    console.error(error);
    return imageUrls;
  }
};

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="mb-3 w-full input input-bordered" />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="mb-3 w-full textarea textarea-bordered" />
        <input
          required
          name="price"
          placeholder="Price"
          type='number'
          className="mb-3 w-full input input-bordered" />
        <div className="flex flex-row pb-5">
          <input
            required
            name="image1"
            placeholder="Image"
            type='file'
            className="file-input file-input-bordered w-full max-w-xs" />
          <div className="pl-5">
            <input
              name="image2"
              placeholder="Image"
              type='file'
              className="file-input file-input-bordered w-full max-w-xs" />
          </div>
          <div className="pl-5">
            <input
              name="image3"
              placeholder="Image"
              type='file'
              className="file-input file-input-bordered w-full max-w-xs" />
          </div>
        </div>
        <div className="flex flex-row pb-5">
          <input
            name="image4"
            placeholder="Image"
            type='file'
            className="file-input file-input-bordered w-full max-w-xs" />
          <div className="pl-5">
            <input
              name="image5"
              placeholder="Image"
              type='file'
              className="file-input file-input-bordered w-full max-w-xs" />
          </div>
          <div className="pl-5">
            <input
              name="image6"
              placeholder="Image"
              type='file'
              className="file-input file-input-bordered w-full max-w-xs" />
          </div>
        </div>



        <FormSubmitButton className="btn-block">Add product</FormSubmitButton>
      </form>
    </div>
  )
}