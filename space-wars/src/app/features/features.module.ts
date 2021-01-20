import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FindFalconeComponent } from './find-falcone/find-falcone.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { ReactiveFormsModule } from '@angular/forms';
import { FindFalconeService } from './find-falcone/find-falcone.service';
import { MatIconModule } from '@angular/material/icon';
import { SearchResultComponent } from './search-result/search-result.component';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [FindFalconeComponent, SearchResultComponent, WelcomeComponent],
  imports: [
    SharedModule,
    CommonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule ,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule ,
    BrowserModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule
  ],
  providers: [FindFalconeService],
  exports: [CommonModule, FindFalconeComponent, RouterModule]
})
export class FeaturesModule { }
