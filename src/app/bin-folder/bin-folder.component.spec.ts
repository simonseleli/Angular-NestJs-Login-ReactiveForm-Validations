import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinFolderComponent } from './bin-folder.component';

describe('BinFolderComponent', () => {
  let component: BinFolderComponent;
  let fixture: ComponentFixture<BinFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinFolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
