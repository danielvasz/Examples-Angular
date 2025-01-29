import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarCharacterComponent } from './snackbar-character.component';

describe('SnackbarCharacterComponent', () => {
  let component: SnackbarCharacterComponent;
  let fixture: ComponentFixture<SnackbarCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
