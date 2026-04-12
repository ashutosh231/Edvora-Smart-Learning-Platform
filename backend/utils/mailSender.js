import nodemailer from "nodemailer"

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.BREVO_SMTP_HOST,
                auth:{
                    user: process.env.BREVO_SMTP_USER,
                    pass: process.env.BREVO_SMTP_PASS,
                }
            })


            let info = await transporter.sendMail({
                from: `${process.env.BREVO_FROM_NAME} <${process.env.BREVO_FROM_EMAIL}>`,
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


export default mailSender;