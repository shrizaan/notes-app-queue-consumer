class Listener {
  constructor(notesService, mailSender) {
    this._notesService = notesService;
    this._mailSender = mailSender;
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());

      const notes = await this._notesService.getNotes(userId);
      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(notes));
      console.trace(result);
    } catch (error) {
      console.error(error);
    }
  }
}