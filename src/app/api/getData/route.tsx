import { MongoClient } from "mongodb";


export async function GET(request: Request) {
    // For example, fetch data from your DB here
     const lol = process.env.MONGODB_URL;
     if (!lol) {
         throw new Error("MONGODB_URL environment variable is not defined");
     }
        const client = new MongoClient("mongodb+srv://sproutshacks:I1tGfKqHsxq6WpSn@cluster0.wmkou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

        });
        await client.connect();

        const database = client.db("filos");
        const collection = database.collection("users");
        const allUsers = await collection.find({}).toArray();
        await client.close();
   
    return new Response(JSON.stringify(allUsers), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
   
  