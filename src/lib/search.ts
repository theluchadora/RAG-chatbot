import {cosineDistance, desc, gt, sql} from "drizzle-orm";
import { db } from "@/lib/db-config";
import { documents } from "./db-schema";
import { generateEmbedding } from "./embeddings";