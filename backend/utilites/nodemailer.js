"use strict";
import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: "Gmail",
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "isurupramudith.20@cse.mrt.ac.lk",
        pass: "zxvedohevfwprwxc",
    },
});

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });
    res.status(201).json({message:"success"})
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}

