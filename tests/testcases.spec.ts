import { test, expect } from '@playwright/test';
import { MyAccountPage } from './pages/myAccountPage';


    test('Test Case 1', async ({ page }) => {
        //Setup
        await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
        const myAccountPage = new MyAccountPage(page);
        myAccountPage.dismissBanner();
        //1- Log in to an account
        myAccountPage.login('magmortar@pmail.com', 'octoberComic0n!?');
        //2- Enter the shop
        await page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }).click();
        //3- Add a clothing item to the cart
        await page.getByLabel('Add “Belt” to your cart').click();
        //4- View the cart
        await page.getByRole('link', { name: 'View cart ' }).click();
        //5- Apply a coupon 'edgewords'
        //await page.getByPlaceholder('Coupon code').click();
        await page.getByPlaceholder('Coupon code').fill('edgewords');
        await page.getByRole('button', { name: 'Apply coupon' }).click();

        //6- Check that the coupon is valid for a 15% discount



        //7- Check that the total after shipping has been calculated correctly



        //8- Log out
        const discountAmount = await page.getByRole('cell', { name: /-£\d+(\.\d{1,2})? \[Remove\]/ }).textContent();
        const subtotalAmount = await page.getByRole('row', { name: 'Subtotal £' }).locator('bdi').textContent();
        const shippingAmount = await page.getByText('Flat rate: £').textContent();
        
        console.log(discountAmount);
        console.log(subtotalAmount);
        console.log(shippingAmount);


        await page.locator('#menu-item-46').getByRole('link', { name: 'My account' }).click();
        await page.getByRole('link', { name: 'Log out' }).click();
    }),  

    test('Test Case 2', async ({ page }) => {
        //Setup
        await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
        await page.getByRole('link', { name: ' Dismiss' }).click();
        //1- Log in to an account
        await page.getByLabel('Username or email address *').fill('magmortar@pmail.com');
        await page.locator('#password').fill('octoberComic0n!?');
        await page.getByRole('button', { name: 'Log in' }).click();
        //2- Enter the shop
        await page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }).click();
        //3- Add a clothing item to the cart
        await page.getByLabel('Add “Belt” to your cart').click();
        //4- View the cart
        await page.getByRole('link', { name: 'View cart ' }).click();
        //5- Proceed to checkout

        //6- Enter Billing Details
        //7- Select “check payments” for payment method
        //8- Place the order
        //9- Capture the order number
        //10- Navigate to my account-> orders
        //11- Check the same order appears
        //12- Logout


    });

