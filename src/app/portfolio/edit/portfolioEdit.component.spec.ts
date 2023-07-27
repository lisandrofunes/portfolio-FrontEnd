import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfolioEditComponent } from './portfolioEdit.component';

describe('EditComponent', () => {
  let component: PorfolioEditComponent;
  let fixture: ComponentFixture<PorfolioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfolioEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorfolioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
