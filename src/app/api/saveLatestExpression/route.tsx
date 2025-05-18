import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: Request) {
  const client = new MongoClient(
    "mongodb+srv://sproutshacks:I1tGfKqHsxq6WpSn@cluster0.wmkou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  try {
    await client.connect();

    const database = client.db("filos");
    const collection = database.collection("users");

    const { _id, expression, certainty } = await request.json();

    // Validate input
    if (!_id || !expression) {
      return new Response(
        JSON.stringify({ error: "Missing _id or expression" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(_id)) {
      return new Response(
        JSON.stringify({ error: "Invalid _id format" }),
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

    // Ensure history is a string
    const currentHistory = typeof userDoc.history === "string" ? userDoc.history : "";

    const newEntry = `<This User was ${expression} to ${certainty}% magnitude>\n`;
    const updatedHistory = currentHistory + newEntry;

    // Update the document
    await collection.updateOne(
      { _id: objectId },
      { $set: { history: updatedHistory } }
    );

    return new Response(
      JSON.stringify({ history: updatedHistory }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
}
