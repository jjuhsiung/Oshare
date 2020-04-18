import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalStreamComponent } from './global-stream.component';

describe('GlobalStreamComponent', () => {
  let component: GlobalStreamComponent;
  let fixture: ComponentFixture<GlobalStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
