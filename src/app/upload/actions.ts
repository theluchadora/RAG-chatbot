"use server";

import pdf from "pdf-parse";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";
import { success } from "zod/v4";


export async function processPDFFile(formData: FormData) {
 try{
    const file = formData.get("pdf") as File;

    // to extract the text we convert the file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const data = await pdf(buffer);

    if(!data.text || data.text.trim().length === 0){
        return {
            success: false,
            error: "No text found on PDF",
        }
    }

    //chunking the text 
    const chunks = await chunkContent(data.text);

    //embedding the chunks
    const embeddings = await generateEmbeddings(chunks);

    //store in database
    const records = chunks.map((chunk, index) => ({
        content: chunk,
        embedding: embeddings[index],
    }));
    await db.insert(documents).values(records);

    return {
        success: true,
        message: `Created ${records.length} searchable chunks`,
    }


 }catch(error){
    console.error("PDF Processing Error:", error);
    return {
        success: false,
        error: "Failed to process PDF",
    }
 }
}