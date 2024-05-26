import { Directive, EventEmitter, Output } from '@angular/core';
import { ImageModel } from '../../../services/models/get-civit-images.model';

@Directive({
	selector: '[openImg]'
})
export class OpenImgDirective extends EventEmitter<ImageModel> {
	@Output()
	public readonly openImg = this;
}
