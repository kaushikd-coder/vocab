import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const wordSchema = new Schema({
  name: String,
  partsOfSpeech: [],
  definition: [],
  shortDefinitions: [],
  examples: [],
});

export default model('Word', wordSchema);
