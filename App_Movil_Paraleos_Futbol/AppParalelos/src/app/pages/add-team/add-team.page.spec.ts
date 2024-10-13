import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTeamPage } from './add-team.page';

describe('AddTeamPage', () => {
  let component: AddTeamPage;
  let fixture: ComponentFixture<AddTeamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
