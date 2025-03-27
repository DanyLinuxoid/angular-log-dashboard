import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './core/app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { lv_LV, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import lv from '@angular/common/locales/lv';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon'; 
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

registerLocaleData(lv);

bootstrapApplication(AppComponent, {
  providers: [
    provideNzI18n(lv_LV),
    importProvidersFrom(FormsModule, NzIconModule), // Добавляем NzIconModule
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: NZ_ICONS, useValue: icons }, // Регистрируем иконки
  ],
}).catch(err => console.error(err));
