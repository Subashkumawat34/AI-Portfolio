require('dotenv').config();
const Razorpay = require('razorpay');

async function testRazorpay() {
    console.log("Testing Razorpay Configuration...");

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        console.error("❌ Missing Razorpay keys in environment variables");
        return;
    }

    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: 50000, // 500 INR
            currency: "INR",
            receipt: "receipt#1",
        };

        const order = await instance.orders.create(options);
        console.log("✅ Razorpay Order Created Successfully:", order);
    } catch (error) {
        console.error("❌ Error creating Razorpay order:", error);
    }
}

testRazorpay();
