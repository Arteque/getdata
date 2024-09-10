import { Context } from "@netlify/functions";
import main from "./index";

const getData = async () => {
    await main()
    console.log("Ok")
}

export default getData