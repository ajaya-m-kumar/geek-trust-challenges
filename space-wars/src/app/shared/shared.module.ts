import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DataManipulationService } from './services/data/data-manipulation.service';
import { TranslationService } from './services/translate/translation.service';
import { HttpClientModule } from '@angular/common/http';
import { StateService } from './services/state/state.service';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [TranslationService, DataManipulationService, StateService],
  exports: [HeaderComponent, CommonModule]
})
export class SharedModule { }
