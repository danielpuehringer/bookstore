import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import {BookStoreService} from "./shared/book-store.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { BookFormComponent } from './book-form/book-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import { DateValueAccessorModule} from "angular-date-value-accessor";

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    BookFormComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DateValueAccessorModule,
  ],
  providers: [BookStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
