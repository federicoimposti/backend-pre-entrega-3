import { createTransport } from 'nodemailer';

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'federico.imposti@gmail.com',
        pass: 'degynbvlagsamgma'
    }
 });

export default transporter;