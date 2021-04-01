import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUdemyComponent } from './form-udemy.component';

describe('FormUdemyComponent', () => {
  let component: FormUdemyComponent;
  let fixture: ComponentFixture<FormUdemyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUdemyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUdemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
