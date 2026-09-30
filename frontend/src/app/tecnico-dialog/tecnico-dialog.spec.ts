import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoDialog } from './tecnico-dialog';

describe('TecnicoDialog', () => {
  let component: TecnicoDialog;
  let fixture: ComponentFixture<TecnicoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicoDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TecnicoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
