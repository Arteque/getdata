const puppeteer = require('puppeteer')
import { title } from "process"
import { Browser } from "puppeteer"

// const url = 'https://books.toscrape.com'
const url = 'https://www.aponet.de/apotheke/notdienstsuche/gotha/%20/5'

const main = async () => {
    const browser: Browser = await puppeteer.launch()
    

    const page = await browser.newPage()

    await page.goto(url)

    const data = await page.evaluate((url) => {
        const items = Array.from(document.querySelectorAll("#pharmacy-search-result .list-group-item"))
       
        const response = items.map((apotheke:any) => ({
            name: apotheke.querySelector(".name").innerText.trim(),
            tel:apotheke.querySelector(".row .col-md-4:nth-of-type(2) a").innerText.replace("/","").replace("+49","0").replace("0049","0").trim(),
            address: {
                str: apotheke.querySelector(".row .col-md-4:nth-of-type(1) .strasse").innerText.trim(),
                plz: apotheke.querySelector(".row .col-md-4:nth-of-type(1) .plz").innerText.trim(),
                ort: apotheke.querySelector(".row .col-md-4:nth-of-type(1) .ort").innerText.trim(),
            },
            dist:apotheke.querySelector(".distanz").innerText.replace("Entfernung: ","").replace(" km","").trim()
        }))
        return response
    }, url)
    
    return data
    // console.log(data)
    await browser.close()
}

main()