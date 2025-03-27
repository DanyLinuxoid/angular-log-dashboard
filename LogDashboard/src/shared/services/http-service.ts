import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private message: NzMessageService) { }

  async fetch<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error (${response.status} - ${response.statusText})`);
      }
      return await response.json();
    } catch (e: any) {
      if (e instanceof Error) {
        console.error('Fetch error details:', e);
      }

      if (e.name === 'TypeError' && e.message === 'Failed to fetch') {
        console.error('Network error: Failed to fetch');
      }

      this.message.create('error', `Error fetching data: ${e.message}`);
      throw e;
    }
  }
}
