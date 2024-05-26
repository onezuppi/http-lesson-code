import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { filter, Observable, tap } from 'rxjs';

export interface ILoggerData {
	start: Date;
	end: Date;
	duration: number;
	event: HttpEvent<any>
}

export type LoggerFn = (data: ILoggerData) => void;

export const LOGGER_TOKEN = new InjectionToken<LoggerFn[]>('logger', {
	factory: () => [
		() => console.log('noop log')
	]
});


@Injectable()
export class LoggerService implements HttpInterceptor {
	private readonly _loggers  = inject(LOGGER_TOKEN)

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const start = new Date();

        return next.handle(req)
			.pipe(
				tap(event => {
					if (event.type !== HttpEventType.Response){
						return;
					}

					const end = new Date();
					const duration = end.getTime() - start.getTime();
					const data: ILoggerData = {
						start,
						end,
						duration,
						event,
					}

					this._loggers.forEach(l => l(data))
				})
			);
    }
}
