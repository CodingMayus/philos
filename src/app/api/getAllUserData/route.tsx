import { MongoClient } from "mongodb";

// Ideally, move this to an environment variable
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://sproutshacks:I1tGfKqHsxq6WpSn@cluster0.wmkou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function GET(request: Request) {
    const client = new MongoClient(MONGODB_URI);
    const url = new URL(request.url);
    
    // Support for optional query parameters
    let userId;
    
        await client.connect();
        
        const database = client.db("filos");
        const collection = database.collection("users");
        const response = await fetch("/api/getCookie", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          const data = await response.json();
           userId = data.userId;
          
      
        const user = await collection.findOne({ _id: userId });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
     


}