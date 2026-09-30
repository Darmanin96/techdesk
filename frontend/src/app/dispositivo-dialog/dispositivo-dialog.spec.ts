import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoDialog } from './dispositivo-dialog';

describe('DispositivoDialog', () => {
  let component: DispositivoDialog;
  let fixture: ComponentFixture<DispositivoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispositivoDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DispositivoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
