import { model, Schema, Model } from "mongoose";
const schema = new Schema({
    text: { type: String, required: true },
    username: { type: String, required: true },
    guild: { type: String, required: true },
    msgid: { type: String, required: true }
});
const db = model('transcripts', schema)
export default db;