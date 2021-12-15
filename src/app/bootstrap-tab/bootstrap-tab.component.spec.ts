import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapTabComponent } from './bootstrap-tab.component';

describe('BootstrapTabComponent', () => {
  let component: BootstrapTabComponent;
  let fixture: ComponentFixture<BootstrapTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootstrapTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
