import { historyRef } from './firebase';
import HeartReact from '../types/HeartReact';

/**
 * Downloads, formats and returns a list of the historical heart reacts from a given day.
 * @param {string} date the required date in ISO string format (e.g '2020-01-01')
 * @returns {Promise<HeartReact[]>} array of heart reacts (in the order they appear in the csv)
 */
const getHistoricalReacts = async (date:string):Promise<HeartReact[]> => {
  const downloadURL:string = await historyRef.child(date).getDownloadURL();
  const result = await fetch(downloadURL);
  const text = await result.text();

  // Convert csv string into array of HeartReacts
  return text
    .split('\n')
    .slice(1)
    .map(line => line.split(','))
    .map((line):HeartReact => ({
      id: line[0],
      timestamp: new Date(parseInt(line[1])),
      uid: parseInt(line[2]),
      utc_offset: parseFloat(line[3]),
      lon: parseFloat(line[4]),
      lat: parseFloat(line[5]),
      city: line[6],
      region: line[7],
      country: line[8],
      continent: line[9],
    }));
}

export default getHistoricalReacts;

/*
  So I just wrote this beautiful piece of JS and then realised Response.text() was a thing...
  Look at that juicy reduce and double variable for loop 😍
  Hey at least I learned about like 3 completely irrelevant WebAPI classes!
  
  const reader = data.body.getReader();
  let chunks = [];

  // Keep reading chunks of the file stream
  while (true) {
    const { done, value } = await reader.read();        
    if (done) break;
    chunks.push(value);
  }

  // Create Uint8Array with size equal to concatenation of all chunks
  const concatenedResult = new Uint8Array(chunks.reduce((n,chunk) => n + chunk.length, 0));

  // Write all the chunks to the Uint8Array
  for (let i=0,n=0; i<chunks.length; i++) {
    concatenedResult.set(chunks[i], n);
    n += chunks[i].length;
    console.log(i,n)
  }

  const utf8Decoder = new TextDecoder('utf-8');
  const resultString = utf8Decoder.decode(concatenedResult);
  console.log(resultString)
*/
