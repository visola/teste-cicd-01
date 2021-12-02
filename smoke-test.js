const {Builder, By, Key, until} = require('selenium-webdriver');

const url = process.argv[2] || 'http://localhost:3000';

async function clearForm(driver) {
    await driver.findElement(By.css('[name=operand1]')).clear()
    await driver.findElement(By.css('[name=operand2]')).clear()
}

async function testDivide(driver) {
    await clearForm(driver);
    await driver.findElement(By.css('[name=operand1]')).sendKeys('50');
    await driver.findElement(By.css('[name=operand2]')).sendKeys('5');
    await driver.findElement(By.css('[name=operator] > [value=divide')).click();

    await driver.findElement(By.css('form')).submit();

    await driver.wait(until.elementTextIs(
        await driver.findElement(By.css('p')),
        'Seu resultado é: 10'
    ), 1000);
}

async function testMultiply(driver) {
    await clearForm(driver);
    await driver.findElement(By.css('[name=operand1]')).sendKeys('10');
    await driver.findElement(By.css('[name=operand2]')).sendKeys('5');
    await driver.findElement(By.css('[name=operator] > [value=multiply')).click();

    await driver.findElement(By.css('form')).submit();

    await driver.wait(until.elementTextIs(
        await driver.findElement(By.css('p')),
        'Seu resultado é: 50'
    ), 1000);
}

async function testSubtract(driver) {
    await clearForm(driver);
    await driver.findElement(By.css('[name=operand1]')).sendKeys('30');
    await driver.findElement(By.css('[name=operand2]')).sendKeys('20');
    await driver.findElement(By.css('[name=operator] > [value=subtract')).click();

    await driver.findElement(By.css('form')).submit();

    await driver.wait(until.elementTextIs(
        await driver.findElement(By.css('p')),
        'Seu resultado é: 10'
    ), 1000);
}

async function testSum(driver) {
    await clearForm(driver);
    await driver.findElement(By.css('[name=operand1]')).sendKeys('10');
    await driver.findElement(By.css('[name=operand2]')).sendKeys('20');

    await driver.findElement(By.css('form')).submit();

    await driver.wait(until.elementTextIs(
        await driver.findElement(By.css('p')),
        'Seu resultado é: 30'
    ), 1000);
}

(async function suite() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url);

        const form = await driver.findElement(By.css('form'));

        console.log('Teste: 10 + 20');
        await testSum(driver);
        
        console.log('Teste: 30 - 20');
        await testSubtract(driver);
        
        console.log('Teste: 10 * 5');
        await testMultiply(driver);
        
        console.log('Teste: 50 / 5');
        await testDivide(driver);
    } catch (e) {
        console.log("Erro ao executar os testes");
        console.log('-----');
        console.error('Exceção foi', e);
        console.log('-----');
        const text = await driver.findElement(By.css('p')).getText();
        console.log(`Texto no resultado é: ${text}`);
    } finally {
        await driver.quit();
    }
})();
