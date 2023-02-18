import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        //... create plantings
        case "POST":
            //... check if there is same plan id and plant id
            let existOne = await db.collection("plantings").find({plan_id: req.body.plan_id, plant_id: req.body.plant_id}).toArray();
            if(existOne.length === 0){
                await db.collection("plantings").insertOne(req.body);
                return res.json({ status: true, message: 'Planting is created successfully.' });
            }else{
                return res.json({ status: false, message: 'The Planting was already planed.' });
            }

        //... get all plantings or planing by id
        case "GET":
            if(req.query.id === undefined){
                let plantings = await db.collection("plantings").find({}).toArray();
                return res.json({ status: true, data: plantings });
            }else{
                let plan = await db.collection("plantings").findOne({_id: new ObjectId(req.query.id)});
                return res.json({ status: true, data: plan });
            }

        //... update a planting
        case "PUT":
            await db.collection("plantings").updateOne(
                {
                    _id: new ObjectId(req.query.id),
                },
                {
                    $set: {
                        seeds: req.body.seeds,
                        harvest: req.body.harvest,
                        direct_sow: req.body.direct_sow,
                        pinch: req.body.pinch,
                        pot_on: req.body.pot_on,
                        spacing: req.body.spacing,
                        succession: req.body.succession
                    },
                }
            );
            return res.json({ status: true, message: 'Planting is updated successfully.' });

        //... delete a planting
        case "DELETE":
            await db.collection("plantings").deleteOne({_id: new ObjectId(req.query.id)});
            return res.json({ status: true, message: 'The planting is deleted successfully.' });
    }
}