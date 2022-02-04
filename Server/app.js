require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server Started");
});

// api to capture payment from customer
app.post("/payment-intents", (req, res) => {
  stripe.paymentIntents
    .create({
      amount: req.body.totalAmount * 100,
      currency: "aud",
      payment_method_types: ["card"],
      description: "Payment for order",
      receipt_email: req.body.email,
    })
    .then((intent) => {
      stripe.paymentIntents
        .confirm(intent.id, {
          payment_method: "pm_card_visa",
        })
        .then((resp) => {
          res.send(resp);
        });
    });
});

// api to tranfer payment from customer to merchant
app.post("/transfer", async (req, res) => {
  try {
    const obj = await stripe.transfers.create({
      amount: req.body.amount * 100,
      currency: "aud",
      destination: req.body.account,
      description: "testing",
    });

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
