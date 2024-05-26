import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SizeDirective } from './directives/size.directive';
import { TuiButtonModule } from '@taiga-ui/core';
import { VisibilityEmitterDirective } from '../../standalone/intersection.directive';
import { Sd3ImageService } from '../../services/sd3-image.service';
import { OpenImgDirective } from './directives/open-img.directive';


const components: any[] = [
	GalleryComponent,
	SizeDirective,
	OpenImgDirective
];

@NgModule({
	declarations: components,
	imports: [
		CommonModule,
		TuiButtonModule,
		VisibilityEmitterDirective,
	],
	exports: components,
	providers: [
		Sd3ImageService
	],
})
export class GalleryModule {
}
