import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import { sendMail } from '../helpers/emailHelpers';

dotenv.config();

const prisma = new PrismaClient();

export const welcomeUser = async () => {
  try {
    const users = await prisma.user.findMany({
      where: { isWelcomed: false },
    });

    console.log(users);

    for (let user of users) {
      const templatePath = path.resolve(__dirname, '../../templates/welcomeUser.ejs');

      ejs.renderFile(templatePath, { UserName: user.name }, async (error, data) => {
        if (error) {
          console.log(error);
          return;
        }

        let mailOptions = {
          from: process.env.EMAIL as string,
          to: user.email,
          subject: 'Welcome to Medassist',
          html: data,
        };

        try {
          console.log('SOMETHING');
          await sendMail(mailOptions);

          console.log('ANOTHER SOMETHING');

          await prisma.user.update({
            where: { id: user.id },
            data: { isWelcomed: true },
          });

          console.log('Emails sent to new users');
        } catch (error) {
          console.log(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};
