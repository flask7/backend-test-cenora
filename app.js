const express = require('express');
const app = express();
const { Builder, Browser, By, until, manage } = require('selenium-webdriver');
const helperData = require('./helpers/HelperData');
const appPort = 7000;

app.use('/', async (req, res) => {
    
    const urlBase = 'https://www.carnival.com';
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {

        await driver.get(urlBase + '/cruise-ships/mardi-gras.aspx');
        await driver.manage().window().maximize();
        
        driver.wait(function() {
            return driver.executeScript('return document.readyState').then(function(readyState) {
                return readyState === 'complete';
            });
        }, 1000);

        const imagesShip = await driver.findElements(By.className(`hero-img`));

        for (let i = 0; i < imagesShip.length; i++) {

            console.log(await imagesShip[i]?.getAttribute('src'));

        }

       /* const galleryButton = await driver
       .findElements(By.className(`ships-button ships-gallery-tile__gallery-button-large`));
       
        await galleryButton.click();*/

        const galleryImages = await driver.findElements(By.className('ships-modal-gallery__item-image'));
        const galleryTitles = await driver.findElements(By.className('ships-gallery-tile__title'));
        const galleryDescriptions = await driver.findElements(By.className('ships-gallery-tile__description'));

        for (let i = 0; i < galleryImages.length; i++) {
            
            console.log(await galleryImages[i].getAttribute('src'));
            console.log(await galleryTitles[i].getText());
            console.log(await galleryDescriptions[i].getText());

        }

        const deckPlans = await driver.findElement(By.xpath('/html/body/div[3]/form/div[3]/main/div/div[7]/div[4]/div/button'));
        await deckPlans.submit();
        await driver.wait(until(await driver.findElement(By.xpath('/html/body/div/div[3]/div/div[2]/div/div/ul/div/div[1]')).isDisplayed()));
        const listPlans = await deckPlansList.findElements(By.name('li'));

        for (let i = 0; i < listPlans.length; i++) {

            await listPlans[i].findElement(By.name('a')).click();
            
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

        /*await driver.get(urlBase + '/cruise-ships.aspx');
        let shipsLength = await driver
        .findElements(By.xpath(`/html/body/div[3]/form/div[3]/div/div[2]/div[3]/div/div[3]/div[3]/div/a `));

        for (let i = 0; i < shipsLength.length; i++) {
            
            await shipsLength[i].click();
            
            const helper = new helperData();

            await helper.requestShipsData(driver);
            await driver.navigate().back();
            
        }                     */

    }  catch (error) {

        console.log(error);
        res.json({ error });

    }  finally {
        await driver.quit();
    }

});

app.listen(appPort, () => console.log(`App is running on port ${ appPort }`));
        