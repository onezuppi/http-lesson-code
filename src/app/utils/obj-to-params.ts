import { HttpParams } from '@angular/common/http';

export const convertObjToParams = <T extends object>(obj: T): HttpParams => {
	return Object.entries(obj)
		.reduce((params, [key, value]) =>  params.set(key, value), new HttpParams());
}
