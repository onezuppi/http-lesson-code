import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface SDImagesRequestModel {
	prompt: string;
	steps?: number;
	negativePrompt?: string;
	width?: number;
	height?: number;
}

export interface IProgressResponseModel {
	progress: number;
	current_image?: string | null;
}

@Injectable()
export class Sd3ImageService {
	constructor(
		private readonly _http: HttpClient
	) {
	}

	public genImage(params: SDImagesRequestModel): Observable<string> {
		return this._http.post<{ images: string[] }>('/sd-api/txt2img', params)
			.pipe(
				map((obj) => obj.images[0])
			);
	}

	public getProgress(): Observable<IProgressResponseModel> {
		return this._http.get<IProgressResponseModel>('/sd-api/progress');
	}
}
