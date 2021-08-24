import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// ANIMATION
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// CCOKIES
import { CookieService } from 'ngx-cookie-service';

// CAROUSEL
import { MatCarouselModule } from '@ngbmodule/material-carousel';

import { CarouselModule } from 'ngx-owl-carousel-o';

// MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

//Local
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { TopbarComponent } from './shared/header/components/topbar/topbar.component';
import { SearchbarComponent } from './shared/header/components/searchbar/searchbar.component';
import { CategoriesbarComponent } from './shared/header/components/categoriesbar/categoriesbar.component';
import { MenubarComponent } from './shared/header/components/menubar/menubar.component';
import { HomeComponent } from './modules/home/home.component';
import { BannerComponent } from './modules/home/banner/banner.component';
import { BestComponent } from './modules/home/best/best.component';
import { TrendingComponent } from './modules/home/trending/trending.component';
import { FeatureComponent } from './modules/home/feature/feature.component';
import { SingleproductComponent } from './modules/singleproduct/singleproduct.component';
import { InnerheaderComponent } from './shared/innerheader/innerheader.component';
import { CatalogueComponent } from './modules/catalogue/catalogue.component';
import { CartComponent } from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { AuthenticationComponent } from './modules/authentication/authentication.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { PassforgotComponent } from './modules/authentication/passforgot/passforgot.component';
import { BillComponent } from './modules/bill/bill.component';
import { EmptyComponent } from './shared/empty/empty.component';
import { MobilecategoriesComponent } from './shared/header/components/mobilecategories/mobilecategories.component';

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    TopbarComponent,
    SearchbarComponent,
    CategoriesbarComponent,
    MenubarComponent,
    HomeComponent,
    BannerComponent,
    BestComponent,
    TrendingComponent,
    FeatureComponent,
    SingleproductComponent,
    InnerheaderComponent,
    CatalogueComponent,
    CartComponent,
    CheckoutComponent,
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent,
    PassforgotComponent,
    BillComponent,
    EmptyComponent,
    MobilecategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCarouselModule,
    MatCarouselModule.forRoot()
  ],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    {provide: LOCALE_ID, useValue: 'fr' },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
