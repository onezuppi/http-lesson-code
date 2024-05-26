import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { CivitImageService, } from '../../../../services/civit-image.service';
import { ImageModel } from '../../../../services/models/get-civit-images.model';
import { Sd3ImageService } from '../../../../services/sd3-image.service';
import { OpenImgDirective } from '../../directives/open-img.directive';


@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
	public readonly imageS: CivitImageService = inject(CivitImageService);
	public readonly isLoading = signal<boolean>(false);
	public readonly images$ = signal<ImageModel[]>([])
	public readonly image = signal<string>('')
	private readonly sdService = inject(Sd3ImageService);
	public readonly openImg = inject(OpenImgDirective)

	private _page = 1;

	public ngOnInit(): void {
		this.load();
	}


	public load(): void {
		this.isLoading.update(() => true);
		this.imageS.getImages({
			limit: 10,
			period: 'Week',
			page: this._page++
		})
			.subscribe(imgs => {
				this.isLoading.update(() => false);
				this.images$.update(old => [...old, ...imgs]);
			});
	}
}

