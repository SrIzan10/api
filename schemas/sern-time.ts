import { model, Schema, Model } from "mongoose";
const schema = new Schema({
    name: { type: String, required: true },
    timezone: { type: String, required: true },
    userid: { type: String, required: true }
});
const db = model('sern-timezones', schema)
export default db;