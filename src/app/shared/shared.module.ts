import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatDividerModule, MatToolbarModule,
  MatSidenavModule, MatIconModule, MatListModule, MatSelectModule, MatProgressBarModule, MatSnackBarModule,
  MatRadioModule, MatTableModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule,
  MatPaginatorModule, MatTabsModule, MatSlideToggleModule, MatCheckboxModule, MatChipsModule, MatMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    // Material Modules
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatDividerModule, MatDatepickerModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatSelectModule,
    MatSlideToggleModule, MatCheckboxModule, MatChipsModule, MatMenuModule, MatExpansionModule,
    MatProgressBarModule, MatSnackBarModule, MatRadioModule, MatTableModule, MatDialogModule, MatTabsModule,
    MatNativeDateModule, MatExpansionModule, MatPaginatorModule,

    // Angular Modules
    ReactiveFormsModule, LayoutModule, CommonModule, FlexLayoutModule, RouterModule,
  ],
  exports: [
    // Material Modules
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatDividerModule, MatDatepickerModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatSelectModule,
    MatSlideToggleModule, MatCheckboxModule, MatChipsModule, MatMenuModule, MatExpansionModule,
    MatProgressBarModule, MatSnackBarModule, MatRadioModule, MatTableModule, MatDialogModule, MatTabsModule,
    MatNativeDateModule, MatExpansionModule, MatPaginatorModule,

    // Angular Modules
    ReactiveFormsModule, LayoutModule, CommonModule, FlexLayoutModule, RouterModule,
  ]
})
export class SharedModule { }
