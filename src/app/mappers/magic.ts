import { map, Observable } from 'rxjs';

type FieldTypes = { [key: string]: any };

function processValue(type: any, value: any): any {
	if (type === Boolean && typeof value === 'boolean') {
		return value;
	} else if (type === Date && typeof value === 'string') {
		return new Date(value);
	} else if (type === Number && typeof value === 'string') {
		return parseFloat(value);
	} else if (type === String && typeof value !== 'string') {
		return String(value);
	} else if (Array.isArray(type) && type.length === 1) {
		const itemType = type[0];
		if (Array.isArray(value)) {
			return value.map(item => processValue(itemType, item));
		}
	} else if (typeof type === 'function' && value instanceof Object) {
		return new type(value);
	}
	return value;
}

type ToPrimitive<T> = T extends String
	? string
	: T extends Number
		? number
		: T extends Boolean
			? boolean
			: T extends Array<infer U>
				? Array<ToPrimitive<U>>
				: T;

type ConvertTypes<T> = {
	[K in keyof T]: T[K] extends { new (data: any): any }
		? ToPrimitive<InstanceType<T[K]>>
		: T[K] extends Array<infer U extends abstract new (...args: any) => any>
			? Array<ToPrimitive<InstanceType<U>>>
			: ToPrimitive<T[K]>;
};

export function genModel<T extends FieldTypes>(fields: T): {
	new (data: Partial<{ [K in keyof T]: any }>): Readonly<ConvertTypes<T>>
} {
	return class {
		constructor(data: Partial<T>) {
			const properties: PropertyDescriptorMap = {};

			Object.keys(fields).forEach((key: string) => {
				const type = fields[key as keyof T];
				let value = processValue(type, data[key as keyof T]);

				properties[key] = {
					value,
					writable: false,
					configurable: false,
					enumerable: true
				};
			});

			Object.defineProperties(this, properties);
		}
	} as any;
}

