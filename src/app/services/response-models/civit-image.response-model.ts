
export interface IImageResponseModel {
	readonly url: string;
	readonly width: number;
	readonly height: number;
	readonly createdAt: string;
}

export interface IImageResponse {
	readonly items: IImageResponseModel[];
}
