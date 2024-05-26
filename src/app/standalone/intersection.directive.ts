import { Directive, ElementRef, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
	selector: '[appVisibilityEmitter]',
	standalone: true
})
export class VisibilityEmitterDirective implements AfterViewInit, OnDestroy {
	@Output() isVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
	private observer!: IntersectionObserver;

	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		this.observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				this.isVisible.emit(entry.isIntersecting);
				if (entry.isIntersecting) {
					// Опционально: можно прекратить наблюдение после первого обнаружения видимости
					// this.observer.unobserve(this.el.nativeElement);
				}
			});
		}, {
			rootMargin: '0px',
			threshold: 0.1 // Определите, какая часть элемента должна быть видна, чтобы считаться видимой
		});

		this.observer.observe(this.el.nativeElement);
	}

	ngOnDestroy(): void {
		this.observer.disconnect();
	}
}
