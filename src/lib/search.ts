import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { db } from "@/lib/db-config";
import { documents } from "./db-schema";
import { generateEmbedding } from "./embeddings";

// Search for similar documents using Drizzle ORM with cosineDistance - would consider it heart of rag system
export async function searchDocuments(
  query: string,
  limit: number = 5,
  threshold: number = 0.5,
) {
  const embedding = await generateEmbedding(query);

  //because cosineDistance gives the disimilarity and we want the similarity so we can compare with threshold
  //This creates a SQL expression for similarity calculation
  const similarity = sql<number>`1 -(${cosineDistance(documents.embedding, embedding)})`;

  // Use Drizzle's query builder for writing query the search
  const similarDocuments = await db
    .select({
      id: documents.id,
      content: documents.content,
      similarity,
    })
    .from(documents)
    .where(gt(similarity, threshold))
    .orderBy(desc(similarity))
    .limit(limit);

  return similarDocuments;
}
