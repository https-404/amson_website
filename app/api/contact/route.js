// import axios from 'axios';
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const payload = await request.json();
//   const token = process.env.TELEGRAM_BOT_TOKEN;
//   const chat_id = process.env.TELEGRAM_CHAT_ID;

//   if (!token || !chat_id) {
//     return NextResponse.json({
//       success: false,
//     }, { status: 200 });
//   };

//   try {
//     const url = `https://api.telegram.org/bot${token}/sendMessage`;
//     const message = `New message from ${payload.name}\n\nEmail: ${payload.email}\n\nMessage:\n ${payload.message}\n\n`;

//     const res = await axios.post(url, {
//       text: message,
//       chat_id: process.env.TELEGRAM_CHAT_ID
//     });

//     if (res.data.ok) {
//       return NextResponse.json({
//         success: true,
//         message: "Message sent successfully!",
//       }, { status: 200 });
//     };
//   } catch (error) {
//     console.log(error.response.data)
//     return NextResponse.json({
//       message: "Message sending failed!",
//       success: false,
//     }, { status: 500 });
//   }
// };


import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const payload = await request.json();

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Gmail email address from which to send emails
      pass: process.env.EMAIL_PASS,  // Gmail password or app-specific password
    },
  });

  // Construct email message
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,  // Gmail address where you want to receive emails
    subject: 'New Message from Contact Form',
    text: `
      New message from ${payload.name}
      Email: ${payload.email}
      Message:
      ${payload.message}
    `,
  };

  try {
    // Send email using Nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    // Send success response
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    // Send error response
    return NextResponse.json({
      success: false,
      message: 'Message sending failed!',
    }, { status: 500 });
  }
}
