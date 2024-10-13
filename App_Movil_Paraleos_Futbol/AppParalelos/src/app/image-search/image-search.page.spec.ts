import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageSearchPage } from './image-search.page';

describe('ImageSearchPage', () => {
  let component: ImageSearchPage;
  let fixture: ComponentFixture<ImageSearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
