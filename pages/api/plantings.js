import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        //... create plantings
        case "POST":
            await db.collection("plantings").insertOne(req.body);
            return res.json({ status: true, data: 'Planting is created successfully.' });

        //... get all plantings or planing by id
        case "GET":
            const { plantingid } = req.query;
            if(plantingid === undefined){
                let plantings = await db.collection("plantings").find({}).toArray();
                return res.json({ status: true, data: plantings });
            }else{
                let plan = await db.collection("plantings").findOne({_id: new ObjectId(plantingid)});
                return res.json({ status: true, data: plan });
            }

        //... update a planting
        case "PUT":
            const { id } = req.query;
            await db.collection("plantings").updateOne(
                {
                    _id: new ObjectId(id),
                },
                {
                    $set: {
                        seeds: req.body.seeds,
                        harvest: req.body.harvest,
                        direct_sow: req.body.direct_sow,
                        pinch: req.body.pinch,
                        pot_on: req.body.pot_on
                    },
                }
            );
            return res.json({ status: true, message: 'Planting is updated successfully.' });

        //... delete a planting
        case "DELETE":
            await db.collection("plantings").deleteOne({_id: new ObjectId(req.query)});
            return res.json({ status: true, message: 'The planting is deleted successfully.' });
    }
}