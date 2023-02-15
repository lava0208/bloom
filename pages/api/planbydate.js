import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    
    let today_start = new Date();
    today_start.setHours(0,0,0,0);
    console.log(today_start);
    // let today_end = today.setHours(23,59,59,999);
    let today_plans = await db.collection("plans").find({date:{$gte:today_start,$lt:"2023-02-08T04:59:59.999Z"}}).toArray();

    let tomorrow_start = new Date();
    tomorrow_start.setHours(0,0,0,0);
    console.log(tomorrow_start);
    tomorrow_start.setDate(tomorrow_start.getDate() + 1);
    let tomorrow_end = new Date();
    tomorrow_end.setHours(23,59,59,999);
    tomorrow_end.setDate(tomorrow_end.getDate() + 1);

    let before7Daysdate=new Date(today_start.setDate(today_start.getDate() - 7));

    
    let tomorrow_plans = await db.collection("plans").find({date:{$gte:tomorrow_start,$lt:tomorrow_end}}).toArray();
    let week_plans = await db.collection("plans").find({date:{$gte:before7Daysdate, $lt:today_start}}).toArray();

    return res.json({ status: true, data: {today: today_plans, tomorrow: tomorrow_plans, week: week_plans} });
}