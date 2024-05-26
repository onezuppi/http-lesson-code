import { Component } from '@angular/core';
import { IAddImage, ImageService } from '../../../../services/live-image.service';
import { OpenImgDirective } from '../../directives/open-img.directive';
import { ImageModel } from '../../../../services/models/get-civit-images.model';
import { Meta } from '@angular/platform-browser';



@Component({
	selector: 'app-live-images',
	templateUrl: './live-images.component.html',
	styleUrl: './live-images.component.scss'
})
export class LiveImagesComponent {
	images$ = this.imageService.images$;

	constructor(
		public readonly openImage: OpenImgDirective,
		private imageService: ImageService,

	) {
	}

	public open(img: IAddImage) {
		this.openImage.emit(new ImageModel({
			...img.origin,
			height: img.data.height,
			url: img.image,
			width: img.data.width,
			meta: new Meta({
				...img.origin.meta,
				prompt: img.data.prompt,
				negativePrompt: img.data.negativePrompt,
				steps: img.data.steps
			})
		}));
	}
}
