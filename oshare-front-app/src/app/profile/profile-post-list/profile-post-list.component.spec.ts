import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostListComponent } from './profile-post-list.component';

describe('ProfilePostListComponent', () => {
  let component: ProfilePostListComponent;
  let fixture: ComponentFixture<ProfilePostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
