
# Stripe Payment Gateway Demo 2

### The application works in the following flow

- Buyer clicks on buy now and select quantity
- Suppliers gets an email with the link to reject or accept the order
- Supplier accepts order and buyer recieves email to pay now
- Buyer pays and money flows into platform
- Supplier marks the order as completed
- Money flows from platform to supplier


There are two roles in this application:
- User 
- Suppler 

## To get started with this application. Following Requirements:
- Your Stripe Account, create from here https://dashboard.stripe.com/register
- You need two API keys one a public key that is used in client, and second is a secret key which will be use in server.
- Atleast three connects account (i.e supplier account which is based on your stripe account) to test the payment transfer.

## What you have to modified to run this application?
- On Client, replace the STRIPE_KEY with your public key in [.env](https://github.com/fahad-aleem/Stripe-Payment-Demo-2/blob/main/Client/.env) file. 
- On Client, replace your supplier connect IDs from the [products.js](https://github.com/fahad-aleem/Stripe-Payment-Demo-2/blob/main/Client/products.js) file which will be used for transfer amount later.
- On Client, adjust the percentage of your application fee from [stripe-server.js](https://github.com/fahad-aleem/Stripe-Payment-Demo-2/blob/main/Client/strpe-server.js) (By default, it will deduct 25% from the total amount as application fee). 
- On Server, replace STRIPE_SECRET_KEY with your secret key in [.env](https://github.com/fahad-aleem/Stripe-Payment-Demo-2/blob/main/Server/.env) file.

## Run Locally

Clone the project

```bash
  git clone https://github.com/fahad-aleem/Stripe-Payment-Demo-2
```

Go to the project directory

```bash
  cd Stripe-Payment-Demo-2
```
### Setup Client

Go to client directory

```bash
  cd Client
```

Install dependencies

```bash
  npm install
```

Start the Client.

```bash
  npm run dev
```

### Setup Server

Go to client directory

```bash
  cd Server
```

Install dependencies

```bash
  npm install
```

Start the server.

```bash
  npm start
```


## API Reference

#### 

https://stripe.com/docs/stripe-js/react
https://stripe.com/docs/payments/payment-intents



## How it is working?

- There are three products are listed at / route when you start your application. You can add more items in [products.js](https://github.com/fahad-aleem/Stripe-Payment-Demo-2/blob/main/Client/products.js) to show. By default we have only three items. 
- When the user clicks on buy now button, a popup will appear which takes full name of customer, email, quantity that he want to purchase and then enter their credit card information and then click on submit. 
- The order will be placed and order request goes to the supplier. The order is in pending state for now  untill the supplier accepts this order, you can check the customers orders when you go to /dashboard route.
- The payment will capture at this moment, and transfer it to our platform. 
- To see the supplier dashboard go to /supplier route, all the orders that belongs to that supplier listed there. 
- Supplier can accept, reject and marked the order as deliver from the change status button. When he accept the order the order will go into active state. 
- When the supplier marked as delivered, the payment will automatically transferred to the supplier connect account i.e payment flows from our platform to supplier platform. 
