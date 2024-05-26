import { Component, Inject, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ModalImgComponent } from '../../components/modal-img/modal-img.component';
import { ImageModel } from '../../services/models/get-civit-images.model';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})
export class MainComponent {

	constructor(
		@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
		private readonly _injector: Injector,
	) {
	}

	public showImg(img: ImageModel): void {
		this.dialogs.open(
			new PolymorpheusComponent(ModalImgComponent, this._injector),
			{
				data: img,
				label: 'Изображение',
			},
		).subscribe()
	}
}
