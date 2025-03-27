import { Injectable } from '@angular/core';
import { LogEntry } from "../interfaces/log.interface";
import { environment } from '../../../environments/environment';
import { LogBase } from '../interfaces/log-base.interface';
import { HttpService } from '@shared/services/http-service';

@Injectable()
export class LogDashboardService {
  constructor(private httpService: HttpService) { }

  async getLogs(): Promise<LogEntry[]> {
    const logs: LogEntry[] = [];
    var logNames = await this.httpService.fetch<string[]>(`${environment.apiUrl}/log-names`);
    if (!logNames || !Array.isArray(logNames)) 
      return [];

    let globalid = 0;
    for (let i = 0; i < logNames.length; i++) {
      const logName = logNames[i];
      const logList = await this.httpService.fetch<LogBase[]>(`${environment.apiUrl}/log-by-name?logName=${logName}`);
      if (!logList || !Array.isArray(logList))
        continue;

      for (var j = 0; j < logList.length; j++) {
        const logEntry = logList[j];
        const fileNameWithoutExtension = logEntry.logName.substring(0, logEntry.logName.lastIndexOf('.'));
        logs.push({
          ...logEntry,
          date: new Date(logEntry.date),
          logName: fileNameWithoutExtension,
          id: globalid++,
          contentPreview: logEntry.content.slice(0, 200),
          isContentShown: false,
          isContentPinned: false,
        });
      }
    }

    return logs;
  }
}
