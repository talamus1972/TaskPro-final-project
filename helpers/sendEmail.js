import sgMail from "@sendgrid/mail";
import "dotenv/config";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (data) => {
  const email = { ...data, from: FROM_EMAIL };
  await sgMail.send(email);
  return true;
};
