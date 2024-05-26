import { IImageResponseModel } from '../response-models/civit-image.response-model';
import { genModel } from '../../mappers/magic';

//export class ImageModel {
//	public readonly url: string;
//	public readonly width: number;
//	public readonly height: number;
//	public readonly createdAt: Date;
//
//	constructor(params: IImageResponseModel) {
//		this.url = params.url;
//		this.width = params.width;
//		this.height = params.height;
//		this.createdAt = new Date(params.createdAt);
//	}
//}

export const MetaImage = genModel({
	prompt: String,
	steps: Number,
	negativePrompt: String,
});

export type MetaImage = InstanceType<typeof MetaImage>;

export const ImageModel = genModel({
	url: String,
	width: Number,
	height: Number,
	createdAt: Date,
	meta: MetaImage
});

export type ImageModel = InstanceType<typeof ImageModel>;
