// import {MongoClient} from 'mongodb';
// export async function POST(request: Request) {
    
//     const client = new MongoClient("mongodb+srv://sproutshacks:I1tGfKqHsxq6WpSn@cluster0.wmkou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//     });
//     client.connect();

//     const database = client.db("filos");
//     const collection = database.collection("users");    

    
    
//     // Parse the request body

//     // const name = username;
//     // const { name,password } = body;
   
//     const { _id, addedString } = await request.json();
//     const history = await collection.findOne({ _id });
//     // e.g. Ins ert new user into your DB   

//         const updatedHistory = history + addedString;
//         await collection.updateOne(
//             { _id },
//             { $set: { history: updatedHistory } }
//         );
   




//     return new Response(JSON.stringify(newUser), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: Request) {
  const client = new MongoClient("mongodb+srv://sproutshacks:I1tGfKqHsxq6WpSn@cluster0.wmkou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

  try {
    await client.connect();

    const database = client.db("filos");
    const collection = database.collection("users");

    const { _id, addedString } = await request.json();

    if (!_id || !addedString) {
      return new Response(
        JSON.stringify({ error: "Missing _id or addedString" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const objectId = new ObjectId(_id);

    // Find the existing document
    const userDoc = await collection.findOne({ _id: objectId });
    if (!userDoc) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Assuming `history` field is a string; otherwise adapt accordingly
    const updatedHistory = (userDoc.history || "") + addedString;

    // Update the document
    await collection.updateOne(
      { _id: objectId },
      { $set: { history: updatedHistory } }
    );

    // Optionally fetch the updated document to return
    const updatedUser = await collection.findOne({ _id: objectId });

    return new Response(JSON.stringify(updatedHistory
        
    ), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
}
