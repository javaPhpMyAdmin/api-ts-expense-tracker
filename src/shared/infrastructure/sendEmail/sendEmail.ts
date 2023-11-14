import { EmailSender, SendEmailType } from "../../domain/sendEmailNotification";
export class SendEmail implements EmailSender {
  send(email: SendEmailType): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
