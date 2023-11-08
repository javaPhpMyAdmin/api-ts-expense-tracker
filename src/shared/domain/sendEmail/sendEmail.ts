export interface SendEmailType {
  to: string;
  from: string;
  message: string;
}

export interface EmailSender {
  send(email: SendEmailType): Promise<void>;
}
