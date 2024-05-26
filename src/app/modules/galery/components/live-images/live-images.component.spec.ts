import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveImagesComponent } from './live-images.component';

describe('LiveImagesComponent', () => {
  let component: LiveImagesComponent;
  let fixture: ComponentFixture<LiveImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
