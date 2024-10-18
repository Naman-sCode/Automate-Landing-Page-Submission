const puppeteer = require('puppeteer');

const url = 'https://ck.hdm3.in/lp.php?sid=085aaaf6&txnid={uniqueid}';

const logRequestDetails = (name, email, phone) => {
    console.log('----- Filling Form -----');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
};

const submitForm = async (name, email, phone) => {
    const browser = await puppeteer.launch({ headless: false }); 
    const page = await browser.newPage();
    
    await page.goto(url);
    
    logRequestDetails(name, email, phone);
    
    try {
        await page.waitForSelector('input[name="lead_data[name]"]'); 
        await page.type('input[name="lead_data[name]"]', name);
        console.log('Name field filled.');

        console.log('Filling email field...');
        await page.waitForSelector('input[name="lead_data[email]"');
        await page.type('input[name="lead_data[email]', email);
        console.log('Email field filled.');

  
        console.log('Filling phone field...');
        await page.waitForSelector('input[name="lead_data[contact_no]"]'); 
        await page.type('input[name="lead_data[contact_no]', phone);
        console.log('Phone field filled.');

        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Submitting form...');
        await Promise.all([
            page.click('button[type="submit"]'), 
            page.waitForNavigation()
        ]);
        console.log('Form submitted.');

    } catch (error) {
        console.error('An error occurred during form submission:', error);
    }
};

submitForm('Naman Kumar Hirani', 'johndoe@example.com', '6260390013');

