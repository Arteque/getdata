import { Context } from "@netlify/functions";
import main from "./index";

exports.handler =  async () => {
    //CORS

    const cors = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    /// Crawling Target
    const url = process.env.API_URL || 'https://www.aponet.de/apotheke/notdienstsuche/gotha/%20/5'
    let results = await main(url)

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

