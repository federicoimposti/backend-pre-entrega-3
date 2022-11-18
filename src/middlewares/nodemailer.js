import * as dotenv from 'dotenv';
dotenv.config();

import { createTransport } from 'nodemailer';

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.MAIL,
        pass: process.env.GMAILPASS
    }
 });

export default transporter;