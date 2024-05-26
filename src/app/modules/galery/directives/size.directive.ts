import { Directive, HostBinding, Input } from '@angular/core';
//import { IImage } from '../components/gallery/gallery.component';

@Directive({
	selector: 'div[img]'
})
export class SizeDirective {

	@HostBinding('class')
	public get size(): string {
		if (!this.img.width || !this.img.height){
			return '';
		}

		if (this.img.width > this.img.height){
			return 'wide';
		}

		if (this.img.height > this.img.width){
			return 'tall'
		}

		return '';
	}

	@Input()
	public img!: any;

}
