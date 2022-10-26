const express = require('express');
const app = express();
const { Builder, Browser, By, until, manage } = require('selenium-webdriver');
const helperData = require('./helpers/HelperData');
const appPort = 8080;

app.use('/', async (req, res) => {
    
    const urlBase = 'https://www.carnival.com';
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {

        await driver.get(urlBase + '/cruise-ships.aspx');
        await driver.manage().window().maximize();

        let shipsLength = await driver.findElements(By.xpath(`/html/body/div[3]/form/div[3]/div/div[2]/div[3]/div/div[3]/div[3]/div/a`));

        for (let i = 0; i < shipsLength.length; i++) {
            
            await driver.sleep(5000);
            await shipsLength[i].click();
            
            const helper = new helperData();

            await helper.requestShipsData(driver);
            await driver.navigate().back();
            
        }                     

    }  catch (error) {

        console.log(error);
        res.json({ error });

    }  finally {
        await driver.quit();
    }

});

app.listen(appPort, () => console.log(`App is running on port ${ appPort }`));
        
        
