import { LogEntry } from "../../features/logs-dashboard/interfaces/log.interface";

export class LogMock {
  getLogs(): LogEntry[] {
    const logCount = this.getRandomNumber(30, 50);
    const entriesPerLog = this.getRandomNumber(50, 200);
    const logEntries: LogEntry[] = [];
    let id = 0;

    for (let i = 1; i <= logCount; i++) {
      const logName: string = `LogName${i}`;
      for (let j = 1; j <= entriesPerLog; j++) {
        logEntries.push({
          content: this.getRandomString(this.getRandomNumber(400, 1500)),
          contentPreview: this.getRandomParagraph(15, 50),
          highlightedContent: '',
          date: this.getRandomDate(),
          logName: logName,
          isContentPinned: false,
          isContentShown: false,
          id: id++,
        });
      }
    }

    return logEntries;
  }

  private getRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.trim();
  }

  private getRandomParagraph(minLines: number, maxLines: number): string {
    const linesCount = this.getRandomNumber(minLines, maxLines);
    let paragraph = '';

    for (let i = 0; i < linesCount; i++) {
      paragraph += this.getRandomString(this.getRandomNumber(50, 150)) + '\n';
    }

    return paragraph.trim();
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomDate(): Date {
    const now = new Date();
    const pastDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const randomTimestamp = this.getRandomNumber(pastDate.getTime(), now.getTime());
    return new Date(randomTimestamp);
  }
}
