import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { mail_configs } from '../interfaces/mail_configs'

dotenv.config()

function createTransporter(configs: mail_configs){
    const transporter = nodemailer.createTransport(configs)

    return transporter;
}

let configurations : any = ({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    auth:{
        user: "gamesmy177@gmail.com",
        pass: "xgqwcuwrromwpbhj"
    }
})

export const sendMail = async(messageOption:any)=>{
    const transporter = createTransporter(configurations)    

    await transporter.verify()
    console.log('verified');

    await transporter.sendMail(messageOption, (error, info)=>{
        if(error){
            console.log(error);
            
        }else{
            console.log(info.response);
        }
    })
}
