import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiAlertModule, TuiButtonModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOGGER_TOKEN, LoggerService } from './services/logger.service';
import { CivitImageService } from './services/civit-image.service';
import { GalleryModule } from './modules/galery/gallery.module';
import { ModalImgComponent } from './components/modal-img/modal-img.component';
import { TuiInputNumberModule, TuiTextareaModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		ModalImgComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		TuiRootModule,
		TuiDialogModule,
		TuiAlertModule,
		TuiButtonModule,
		HttpClientModule,
		GalleryModule,
		TuiTextareaModule,
		TuiInputNumberModule,
		ReactiveFormsModule
	],
	providers: [
		{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
		{ provide: HTTP_INTERCEPTORS, multi: true, useClass: LoggerService  },
		{ provide: LOGGER_TOKEN , multi: true, useValue: console.log },
		CivitImageService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
