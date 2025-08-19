import nodemailer from 'nodemailer'

export async function sendMail (to: string, subject: string, text: string) {
  console.log(`[DEV MAIL] to=${to} subject="${subject}" text="${text}"`);
}