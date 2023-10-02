// import { IProductAdd } from "@/interfaces/admin";
// import axios, { AxiosError } from "axios"

import { IProductAdd } from "@/interfaces/admin";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";




const createProduct=async(product: IProductAdd)=>{
  try {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrls: product.imageURLS
      }
    })

  } catch (error) {
    console.error(error);
    return 'error';
  }
}

export default createProduct;


// const createQuestion = async (product:IProductAdd) =>{
//   try{
//     const response=await axios.post(`${url}/profiles/dailyQuestion`, {
//       "Question":question.question,
//       "Points":question.points,
//       "DateToRelease":question.dateToRelease,
//       "Answers":question.answers
//     });
  
//     if (response.status === 200) {
//       return 'success';
//     } else {
//       return 'Error status'+response.status.toString();
//     }
//   } catch(error){
//     const axiosError = error as AxiosError;
//     if (axiosError.response && axiosError.response.status === 400) {
//       const errorDataString = JSON.stringify(axiosError.response.data).replace(/^"|"$/g, '');
//       return errorDataString;
//     } else {
//       console.error(error);
//       return 'error';
//     }
//   }};