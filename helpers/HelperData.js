const { By } = require("selenium-webdriver");
const fs = require('fs');

class HelperData {

    constructor () { }

    async requestShipsData(driver) {
        
        try {

            /*
            
                let shipsData = [
                    {
                        basics: {
                            referenceImg: /html/body/div[3]/form/div[3]/div/div[2]/div[1]/div/div/ul[1]/li/img,
                            nameShip: sectiontitle (id),
                            // interaction (click)
                            /html/body/div[3]/form/div[3]/div/div[2]/div[3]/div[2]/div[1]/span/a
                            // close interaction
                            description: /html/body/div[3]/form/div[3]/div/div[2]/div[3]/div[2]/div[1]/span/blockquote
                            stats: /html/body/div[3]/form/div[3]/div/div[2]/div[3]/div[1]/ul
                            shipInfo: #overview > div.blurb > ul
                        }
                        inside: {

                            items: [ /html/body/div/div[3]/div/div[2]/div/div/ul/div/div[1] ]

                        }
                    }
                ];
            
            */

            let shipsData = {};
            
            await this.saveData(shipsData);
            const description = await driver.find(By.xpath('/html/body/div[3]/form/div[3]/div/div[2]/div[1]/div/div/ul[1]/li/img'));
            
            console.log(await description.getText());

            //await description.click();

        } catch (error) {

            return { error };

        }

    }

    saveData(json) {

        return new Promise((resolve, reject) => {

            try {

                let data = JSON.stringify(json);
                fs.writeFileSync('./../data/ships-data.json', data);
                resolve(true);

            } catch (e) {
                
                reject(e);

            }

        });

    }

}

module.exports = HelperData;