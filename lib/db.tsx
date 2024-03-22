import { MongoClient } from "mongodb";

export async function connect() {
  return await MongoClient.connect(
    "mongodb+srv://guimarkes457:75Kwe9fPCl2NIoYe@cluster0.bap0lx6.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
  );
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: any
) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client: MongoClient, collection: string) {
  const db = client.db();
  return await db.collection(collection).find().sort({ _id: -1 }).toArray();
}
