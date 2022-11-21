import * as dotenv from 'dotenv';
dotenv.config();

import twilio from 'twilio'

const accountSid = process.env.TWILIOSID
const authToken = process.env.TWILIOTOKEN

const clientTwilio = twilio(accountSid, authToken);

export default clientTwilio;