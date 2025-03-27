import { Component } from "@angular/core";
import { LogsPageComponent } from "../../features/logs-dashboard/page/log-dashboard-page.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    LogsPageComponent,
  ]
})
export class AppComponent {
}
