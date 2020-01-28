/**
 * Downloads, formats and returns a csv table of the historical heart reacts from a given day.
 * @param {string} date the required date in ISO string format (e.g '2020-01-01')
 * @returns {Promise<any[][]>}
 */
const getHistoricalCsv = async date => {
  const downloadURL = await historyRef.child(date).getDownloadURL();
  const result = await fetch(downloadURL);
  const text = await result.text();

  // Convert string into csv table array with correct data types for each column
  let csv = text.split('\n').slice(1);
  csv = csv.map(line => line.split(','));
  csv = csv.map(row => [
    row[0],
    new Date(parseInt(row[1])),
    parseInt(row[2]),
    parseFloat(row[3]),
    parseFloat(row[4]),
    parseFloat(row[5]),
    row[6],
    row[7],
    row[8],
    row[9],
  ]);

  return csv;

  /*
    Omg I just wrote this beautiful piece of JS and then realised Response.text() was a thing...
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
}
