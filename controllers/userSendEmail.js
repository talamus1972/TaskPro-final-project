import sgMail from "@sendgrid/mail";
import "dotenv/config";
import HttpError from "../helpers/HttpError.js";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const HELP_EMAIL = "mitihag446@morxin.com"; //taskpro.project@gmail.com

sgMail.setApiKey(SENDGRID_API_KEY);

export const userSendEmail = async (req, res, next) => {
  try {
    const { comment, userEmail } = req.body;

    if (!comment || !userEmail) {
      throw HttpError(400, "Comment and user email are required");
    }

    const email = {
      to: HELP_EMAIL,
      from: FROM_EMAIL,
      subject: "Help Request",
      html: `<p>User Email: ${userEmail}</p><p>Comment: ${comment}</p>`,
    };

    await sgMail.send(email);

    res.json({
      message: "Email sent successfully!",
    });
  } catch (error) {
    next(error);
  }
};
