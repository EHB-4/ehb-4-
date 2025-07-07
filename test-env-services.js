require('dotenv').config();
const mongoose = require('mongoose');
const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');
const sgMail = require('@sendgrid/mail');
const { initializeApp } = require('firebase/app');
const { io } = require('socket.io-client');
const { Configuration, OpenAIApi } = require('openai');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const log = (service, ok, msg = '') => console.log(`${ok ? '✅' : '❌'} ${service} ${msg}`);

// Supabase removed from project. This script is deprecated.

(async () => {
  // MongoDB
  try {
    await mongoose.connect(process.env.DATABASE_URL, { dbName: undefined });
    log('MongoDB', true);
    await mongoose.disconnect();
  } catch (e) {
    log('MongoDB', false, e.message);
  }

  // Stripe
  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY_TEST);
    await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    log('Stripe', true);
  } catch (e) {
    log('Stripe', false, e.message);
  }

  // SendGrid
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM,
      subject: 'Test Email',
      text: 'This is a test email from EHB script.',
    });
    log('SendGrid', true);
  } catch (e) {
    log('SendGrid', false, e.message);
  }

  // Firebase
  try {
    initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    });
    log('Firebase', true);
  } catch (e) {
    log('Firebase', false, e.message);
  }

  // Socket.IO
  try {
    await new Promise((resolve, reject) => {
      const socket = io(process.env.SOCKET_URL, { transports: ['websocket'], timeout: 5000 });
      socket.on('connect', () => {
        log('Socket.IO', true);
        socket.disconnect();
        resolve();
      });
      socket.on('connect_error', err => {
        log('Socket.IO', false, err.message);
        reject();
      });
      setTimeout(() => {
        log('Socket.IO', false, 'Timeout');
        reject();
      }, 5000);
    });
  } catch {}

  // OpenAI
  try {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello, OpenAI!' }],
    });
    if (completion.data && completion.data.choices) {
      log('OpenAI', true);
    } else {
      throw new Error('No response');
    }
  } catch (e) {
    log('OpenAI', false, e.message);
  }

  // AWS S3
  try {
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const fileContent = Buffer.from('Test file from EHB script');
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: 'test.txt',
        Body: fileContent,
      })
    );
    log('AWS S3', true);
  } catch (e) {
    log('AWS S3', false, e.message);
  }

  // Discord, X.com, Shopify, etc. (Keys loaded check)
  const keys = [
    'DISCORD_API_KEY',
    'X_BEARER_TOKEN',
    'SHOPIFY_API_KEY',
    'SHOPIFY_API_SECRET',
    'SHOPIFY_ACCESS_TOKEN',
    'SHOPIFY_STORE_DOMAIN',
  ];
  let allLoaded = true;
  for (const key of keys) {
    if (!process.env[key]) {
      log(key, false, 'Not found in .env');
      allLoaded = false;
    }
  }
  if (allLoaded) log('Discord, X.com, Shopify Keys', true);

  log('---', true, 'Testing Complete');
})();
