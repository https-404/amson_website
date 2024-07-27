import nodemailer from 'nodemailer';

export async function POST(request) {
  const payload = await request.json();

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Construct email message
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
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
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({
      success: true,
      message: 'Message sent successfully!',
    }), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Message sending failed!',
    }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
    });
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}



