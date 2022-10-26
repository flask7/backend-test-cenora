const { By } = require("selenium-webdriver");
const fs = require('fs');

class HelperData {

    constructor () { }

    async requestShipsData(driver) {
        
        try {
            
            const imagesShip = await driver.findElements(By.className(`hero-img`));
            const galleryButton = await driver.findElements(By.className(`ships-button ships-gallery-tile__gallery-button-large`));
           
            await galleryButton.click();

            for (let i = 0; i < imagesShip.length; i++) {

                console.log(await imagesShip[i]?.getAttribute('src'));

            }

            const galleryImages = await driver.findElements(By.className('ships-modal-gallery__item-image'));
            const galleryTitles = await driver.findElements(By.className('ships-gallery-tile__title'));
            const galleryDescriptions = await driver.findElements(By.className('ships-gallery-tile__description'));
            
            for (let i = 0; i < galleryImages.length; i++) {
                
                console.log(await galleryImages[i].getAttribute('src'));
                console.log(await galleryTitles[i].getText());
                console.log(await galleryDescriptions[i].getText());
                
            }
            
            await driver.sleep(15000);
            await driver.findElement(By.id("cookie-consent-btn")).click();
            await driver.findElement(By.xpath('/html/body/div[3]/form/div[3]/header/nav/h2[6]/a')).click();
            await driver.sleep(5000);
            
            const deckPlans = await driver.findElement(By.xpath('/html/body/div[3]/form/div[3]/main/div/div[7]/div[4]/div/button'));

            await deckPlans.click();
            await driver.sleep(35000);

            let listPlans = await driver.findElements(By.xpath('/html/body/div/div[3]/div/div[2]/div/div/ul/div/div[1]/li'));
            console.log(listPlans);

            listPlans = Array.from(listPlans).map(async plan => await plan.findElement(By.name('a')));

            console.log(listPlans);

            for (let i = 0; i < listPlans.length; i++) {

                await listPlans[i].click();
                await driver.sleep(2000);
                
                const deckValues = await driver.findElement(By.className('deck-image'));
                Array.from(await deckValues.findElements(By.name('a')))
                    .map(async (link) => {
                        
                        await link.click();
                        const slides = await driver.findElements(By.className('slide ccl-negative-outline'));
                        const images = Array.from(slides)
                            .map(async img => await img.findElement(By.name('img').getAttribute('src')));
                        await driver.findElement(By.id('closeButton')).click();
                        return images;

                    });
                
                const imapValues = await driver.findElement(By.id('imap'));
                Array.from(await imapValues.findElements(By.name('area')))
                    .map(async (link) => {
                        
                        await link.click();
                        
                        const roomName = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[1]/div/h1')).getText();
                        const locationName = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[2]/div/div/div[1]/p[1]/strong')).getText();
                        const category = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[2]/div/div/div[1]/p[2]/strong/span')).getText();
                        const deckName = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[2]/div/div/div[1]/p[3]/strong')).getText();
                        const maxGuests = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[2]/div/div/div[1]/ul/li[1]')).getText();
                        const deckImg = await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[2]/div/img')).getAttribute('src');
                        
                        await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[2]/div/div/ul/li[2]')).click();

                        const descriptionDeck = driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]'));

                        await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[3]/div/div/ul/li[2]')).click();

                        const floorImg = driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[3]/div/div/div[2]/img[1]')).getAttribute('src');
                        const dataDeck = [floorImg, deckImg, roomName, locationName, category, deckName, maxGuests, descriptionDeck];
                        
                        console.log(dataDeck);
                        await driver.findElement(By.id('closeButton')).click();
                        return dataDeck;

                    });

                await driver.findElement(By.className('knob')).click();

            }

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