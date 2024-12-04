import { MongoClient } from 'mongodb';
const uri = process.env.COLLEGE_DB;
const client = new MongoClient(uri);

async function fetchStudentsDataFromCollege(usn) {
  try {
    await client.connect();
    const db = client.db("college");
    const collection = db.collection("students");
    const document = await collection.findOne({usn});
    await client.close();
    return document
  } catch (error) {
    console.log(error)
    return null
  }
}

async function fetchTeachersDataFromCollege(usn) {
  try {
    await client.connect();
    const db = client.db("college");
    const collection = db.collection("teachers");
    const document = await collection.findOne({usn});
    await client.close();
    return document
  } catch (error) {
    console.log(error)
    return null
  }
}



export {fetchStudentsDataFromCollege, fetchTeachersDataFromCollege}
