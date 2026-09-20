import {embed, embedMany} from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

const embeddingModel = openrouter.textEmbeddingModel(
    "liquid/lfm-2.5-embedding-350m:free"
);

//singular for search queries
export async function generateEmbedding( text :String){

    const input = text.replace("\n", " ");

    const { embedding } = await embed({
        model:embeddingModel,
        value: input,
    });

    return embedding;
}

//batch for document processing 
export async function generateEmbeddings( texts: String[]){
    const inputs = texts.map((text)=> text.replace("\n", " "));

    const { embeddings } = await embedMany({
        model:embeddingModel,
        values: inputs,
    });

    return embeddings;
}