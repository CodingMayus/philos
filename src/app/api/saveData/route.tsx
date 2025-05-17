import {MongoClient} from 'mongodb';
export async function POST(request: Request) {
    
    const client = new MongoClient("mongodb+srv://sproutshacks:I1tGfKqHsxq6WpSn@cluster0.wmkou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    });
    client.connect();

    const database = client.db("filos");
    const collection = database.collection("users");    

    
    
    // Parse the request body

    const body = await request.json();
    const { email, password } = body;
    // const name = username;
    // const { name,password } = body;
   
    const history = "";
    // e.g. Ins ert new user into your DB   
    const newUser = { email, password ,history};
    await collection.insertOne(newUser);



    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  }