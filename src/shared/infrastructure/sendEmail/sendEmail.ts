import { EmailSender, SendEmailType } from "../../../shared/domain/sendEmail";
export class SendEmail implements EmailSender {
  send(email: SendEmailType): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
