import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { ImageModel } from './models/get-civit-images.model';
import { SDImagesRequestModel } from './sd3-image.service';


export interface IAddImage {
	origin: ImageModel;
	data: SDImagesRequestModel;
	image: string;
}

@Injectable()
export class ImageService {
	private socket!: WebSocket;
	private imagesSubject: BehaviorSubject<IAddImage[]> = new BehaviorSubject<IAddImage[]>([]);
	public images$: Observable<IAddImage[]> = this.imagesSubject.asObservable();

	constructor() {
		this.connect();
	}

	private connect() {
		this.socket = new WebSocket('/live');

		const open$ = fromEvent(this.socket, 'open');
		const close$ = fromEvent(this.socket, 'close');
		const message$ = fromEvent<MessageEvent>(this.socket, 'message').pipe(
			map(event => JSON.parse(event.data))
		);

		merge(open$, close$, message$)
			.subscribe(event => {
				if (event.type === 'initialImages') {
					this.imagesSubject.next(event.images);
				} else if (event.type === 'newImage') {
					this.imagesSubject.next([event.image, ...this.imagesSubject.value]);
				}
		});
	}

	public addImage(image: IAddImage) {
		this.socket.send(JSON.stringify({ type: 'newImage', image }));
	}
}
