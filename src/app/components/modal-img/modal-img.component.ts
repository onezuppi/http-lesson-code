import { Component, Inject, signal } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ImageModel } from '../../services/models/get-civit-images.model';
import { FormControl, FormGroup } from '@angular/forms';
import { IProgressResponseModel, Sd3ImageService, SDImagesRequestModel } from '../../services/sd3-image.service';
import { combineLatest, interval, map, merge, Observable, startWith, switchMap, take, tap } from 'rxjs';
import { ImageService } from '../../services/live-image.service';

const mergeUntilAnyComplete: typeof merge = (...args: Observable<unknown>[]) => {
	return new Observable(s => {
		const subs = args.map(obs => obs.subscribe({
			next: (v) => s.next(v),
			error: e => s.error(e),
			complete: () => {
				s.complete();
				subs.forEach(sub => sub.unsubscribe());
			}
		}));

		return () => subs.forEach(sub => sub.unsubscribe());
	});
}


@Component({
	selector: 'app-modal-img',
	templateUrl: './modal-img.component.html',
	styleUrl: './modal-img.component.scss'
})
export class ModalImgComponent {
	public readonly img: ImageModel = this.context.data;

	public readonly isLoading = signal<boolean>(false);
	public readonly image = signal<IProgressResponseModel | null>(null);

	public readonly form = new FormGroup({
		prompt: new FormControl(this.img.meta.prompt),
        negativePrompt: new FormControl(this.img.meta.negativePrompt),
        steps: new FormControl(this.img.meta.steps),
		width: new FormControl(this.img.width),
		height: new FormControl(this.img.height),
	});

    constructor(
		@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<ImageModel, ImageModel>,
		private readonly _sdService: Sd3ImageService,
		private readonly _imageService: ImageService
	) {
	}

	public genImage(): void {
		this.isLoading.update(() => true);
		const requestData: SDImagesRequestModel = this.form.getRawValue() as SDImagesRequestModel;

		mergeUntilAnyComplete(
			this._sdService.genImage(requestData),
			interval(1000).pipe(switchMap(() => this._sdService.getProgress()))
		).pipe(
			map((img) => {
				return {
					progress: typeof img === 'string' ? 1 : img.progress,
					current_image: `data:image/jpeg;base64,${typeof img === 'string' ? img : img.current_image}`
				}
			})
		)
			.subscribe(res => {
				this.image.update(() => res);
                this.isLoading.update(() => false);
//				res.progress === 1 && sub.unsubscribe();
			});
	}

	public add(img: string): void {
		this._imageService.addImage({
			origin: this.img,
			data: this.form.getRawValue() as any,
			image: img
		});
	}
}
