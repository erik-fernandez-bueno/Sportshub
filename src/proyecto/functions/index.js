const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sportshubefi@gmail.com",
    pass: "Admin_123"
  }
});

exports.enviarCorreo = functions.https.onCall(async (data, context) => {
  const { email, nom, cognom, telefon, adreca } = data;

  const mailOptions = {
    from: 'sportshubefi@gmail.com',
    to: email,
    subject: `Hola ${nom} ${cognom}`,
    text: `Hola ${nom}, este es un mensaje automático.\n\nTeléfono: ${telefon}\nDirección: ${adreca}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
});
