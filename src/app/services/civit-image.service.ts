import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { convertObjToParams } from '../utils/obj-to-params';
import { IImageResponse } from './response-models/civit-image.response-model';
import { IGetImagesRequestModel } from './request-models/get-civit-images.request-model';
import { ImageModel } from './models/get-civit-images.model';


@Injectable()
export class CivitImageService {
	constructor(
		private readonly _http: HttpClient
	) {
	}

	public getImages(params?: IGetImagesRequestModel): Observable<ImageModel[]> {
		return this._http.get<IImageResponse>('/civitai-api/images', {
			params: params ? convertObjToParams(params) : {}
		})
			.pipe(
				map(response => response.items),
				map(items => items.map(item => new ImageModel(item)))
			);
	}
}
