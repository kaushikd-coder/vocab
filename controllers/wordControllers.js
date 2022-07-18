import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import Word from '../models/word.js';

// endpoints params
const endpoint = 'entries';
const language_code = 'en-us';

// Oxford Credentials
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

export const fetchAndAddWords = async (req, res) => {
  const { name } = req.body;

  const word_id = name;

  // app url>>
  const url =
    'https://od-api.oxforddictionaries.com/api/v2/' +
    endpoint +
    '/' +
    language_code +
    '/' +
    word_id;

  // fetching the enter word from the api
  const { data } = await axios(url, {
    headers: {
      app_id,
      app_key,
    },
  });
  // convert the data to the object;
  const data2 = Object.assign({}, data?.results);
  const data3 = Object.assign({}, data2[0].lexicalEntries);
  const data4 = Object.assign({}, data3[0].entries);
  const data5 = Object.assign({}, data4[0].senses);

  // add the word to the MongoDB database for caching;
  const word = await Word.create({
    name,
    definition: data5[0].definitions,
    examples: data5[0].examples,
    shortDefinitions: data5[0].shortDefinitions,
    partsOfSpeech: data3[0].lexicalCategory.id,
  });

  res.status(200).json(word);
};

//  to get all the words
export const getAllWords = async (req, res) => {
  // to search for the word
  const { search } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.name = { $regex: search, $options: 'i' };
  }

  const words = await Word.find(queryObject);
  res.status(200).json(words);
};

//  get single word api
export const getSingleWord = async (req, res) => {
  // to get the single word by id
  const { id } = req.params;
  const word = await Word.findById(id);
  res.status(200).json(word);
};
