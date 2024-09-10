const dotenv = require("dotenv").config()
const crawler = require("./crawler.js")

exports.handler = async (event) => {
  // CORS

  const cors = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }

  /// Crawling Target
  const url = "https://www.aponet.de/apotheke/notdienstsuche?tx_aponetpharmacy_search[action]=result&tx_aponetpharmacy_search[controller]=Search&tx_aponetpharmacy_search[search][plzort]=99867%2BGotha&tx_aponetpharmacy_search[search][date]=&tx_aponetpharmacy_search[search][street]=&tx_aponetpharmacy_search[search][radius]=25&tx_aponetpharmacy_search[search][lat]=&tx_aponetpharmacy_search[search][lng]=&tx_aponetpharmacy_search[token]=216823d96ea25c051509d935955c130fbc72680fc1d3040fe3f8ca0e25f9cd08&type=1981"

  // URL PARAMS for Farchant
  let params = {
    lat: event.queryStringParameters.lat || 47.52838000000001,
    lon: event.queryStringParameters.lon || 11.1113161,
    date: parseInt(event.queryStringParameters.date || Date.now()),
  }

  // CHECK VALIDITY OF TIMESTAMP

  let validDate = new Date(params.date).getTime() > 0

  if (!validDate) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Please provide valid timestamp" }),
      headers: {
        ...cors,
        "Access-Control-Allow-Methods": "GET",
      },
    }
  }

  let results = await crawler.getResults(url)

  if (results.length) {
    return {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: {
        ...cors,
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error while fetching data.",
      }),
      headers: {
        ...cors,
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  }
}
