import { Model, Schema } from "mongoose"

const schema = new Schema({
  name: { type: String, required: true },
  timezone: { type: String, required: true },
});

const db = new Model(schema, 'sern-timezone');

export default db;