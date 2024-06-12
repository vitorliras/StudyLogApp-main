import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupresaComponent } from './supresa.component';

describe('SupresaComponent', () => {
  let component: SupresaComponent;
  let fixture: ComponentFixture<SupresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupresaComponent]
    });
    fixture = TestBed.createComponent(SupresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
