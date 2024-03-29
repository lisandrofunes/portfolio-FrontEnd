import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAddComponent } from './portfolio-add.component';

describe('PortfolioAddComponent', () => {
  let component: PortfolioAddComponent;
  let fixture: ComponentFixture<PortfolioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
