import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SearchComponent } from '@shared/components/search/search.component';
import { MenuItem, SidebarComponent } from '@shared/components/sidebar/side-bar.component';
import { TagFilterComponent } from '@shared/components/tag-filter/tag-filter.component';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BehaviorSubject } from 'rxjs';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { LogListComponent } from '../components/log-list/log-list.component';
import { LogEntry } from '../interfaces/log.interface';
import { LogDashboardService } from '../service/log-dashboard-service.component';

@Component({
  selector: 'log-dashboard-page',
  templateUrl: './log-dashboard-page.component.html',
  styleUrl: './log-dashboard-page.component.css',
  providers: [
    LogDashboardService
  ],
  imports: [
    SidebarComponent,
    LogListComponent,
    SearchComponent,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    CommonModule,
    TagFilterComponent,
    TooltipComponent,
    NzButtonModule,
    LoadingSpinnerComponent
  ],
})

export class LogsPageComponent implements OnInit {
  private latestSearchText: string = '';

  public allLogsName: string = 'All';
  public currentLogNameChosen: string = '';
  public isSearchInitiated: boolean = false;
  public selectedTags: string[] = [];
  public recordsPerRowCount: number = 1;
  public isLoading: boolean = false;

  public allLogs: LogEntry[] = [];
  public filteredLogs: LogEntry[] = [];
  public logsByNames: Map<string, LogEntry[]> = new Map<string, LogEntry[]>();
  public logsToShow$ = new BehaviorSubject<LogEntry[]>([]);
  public logsByCurrentName: LogEntry[] = [];
  public logNames: string[] = [];
  public logMenu: MenuItem[] = [];

  constructor(private logDashboardService: LogDashboardService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.logDashboardService.getLogs().then((logs) => {
        if (!logs)
          return;

        // All logs info
        this.allLogs = logs;
        this.logMenu.push({
          name: this.allLogsName,
          count: this.allLogs.length,
        });

        this.logsByNames = new Map<string, LogEntry[]>();

        // Order by date
        logs.sort((prev, current) => current.date.getTime() - prev.date.getTime());
        logs.map((entry) => {
          if (this.logsByNames.has(entry.logName)) {
            this.logsByNames.get(entry.logName)!.push(entry);
          } else {
            this.logsByNames.set(entry.logName, [entry]);
            this.logNames.push(entry.logName);
          }
        });

        Array.from(this.logsByNames).forEach((elem) => {
          this.logMenu.push({
            name: elem[0],
            count: elem[1].length
          });
        });

      this.chooseLogMenuOption({
        name: this.allLogsName,
        count: 0,
      });
    }).finally(() => {
      this.isLoading = false;
    })
  }

  searchLogs(searchText: string) {
    this.filterLogs(searchText);
  }

  filterLogs(searchText: string): void {
    if (!this.logsByCurrentName)
      return;

    this.latestSearchText = searchText.toLowerCase();
    let logsToFilterOut = this.logsByCurrentName;

    // Filter by tags if any
    if (this.currentLogNameChosen === this.allLogsName && this.selectedTags?.length) {
      const selectedTagsSet = new Set(this.selectedTags);
      logsToFilterOut = logsToFilterOut.filter(log => selectedTagsSet.has(log.logName));
    }

    if (this.latestSearchText) {
      logsToFilterOut = logsToFilterOut.filter(log => log.content.toLowerCase().includes(this.latestSearchText));
      logsToFilterOut = logsToFilterOut.map(log => ({ ...log, isContentPinned: true }));
      this.isSearchInitiated = true;
    } else {
      logsToFilterOut.forEach((x) => x.isContentPinned = false);
      this.isSearchInitiated = false;
    }

    this.filteredLogs = logsToFilterOut;
    this.logsToShow$.next(logsToFilterOut.slice(0, 1000));
  }

  chooseLogMenuOption(logMenuOption: MenuItem): void {
    if (this.currentLogNameChosen == logMenuOption.name)
      return;

    // Reset pins on new log chose
    this.logsByCurrentName.forEach((x) => x.isContentPinned = false);

    if (logMenuOption.name === this.allLogsName) 
      this.logsByCurrentName = this.allLogs;
    else 
      this.logsByCurrentName = this.logsByNames.get(logMenuOption.name) || [];

    this.logsToShow$.next(this.logsByCurrentName?.slice(0, 1000) || []);
    this.isSearchInitiated = false;
    this.currentLogNameChosen = logMenuOption.name;

    // Filter in case search is filled
    this.filterLogs(this.latestSearchText);
  }

  updateRecordsPerRow(): void {
    if (this.recordsPerRowCount >= 4) // Reset when max reached
      this.recordsPerRowCount = 1;
    else
      this.recordsPerRowCount++;
  }

  uploadMoreData(amountToUpload: number): void {
    if (this.logsToShow$.value.length === amountToUpload)
      return;

    const newData = this.filteredLogs.slice(this.logsToShow$.value.length, amountToUpload);
    if (this.isSearchInitiated) // If we have search - pin all
      newData.forEach((x) => x.isContentPinned = true);

    const logs = this.logsToShow$.getValue();
    logs.push(...newData);
    this.logsToShow$.next(logs);
  }

  showPinned(): void {
    this.logsToShow$.next(this.logsToShow$.value.filter((log) => log.isContentPinned));
  }

  unpinAll(): void {
    this.allLogs.forEach((x) => x.isContentPinned = false);
    this.logsToShow$.value.forEach((x) => x.isContentPinned = false);
    this.logsToShow$.next(this.logsToShow$.value);
  }

  pinAll(): void {
    this.allLogs.forEach((x) => x.isContentPinned = true);
    this.logsToShow$.value.forEach((x) => x.isContentPinned = true);
    this.logsToShow$.next(this.logsToShow$.value);
  }
}
