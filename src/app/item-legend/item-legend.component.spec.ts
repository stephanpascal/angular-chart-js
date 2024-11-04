import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLegendComponent } from './item-legend.component';

describe('ItemLegendComponent', () => {
  let component: ItemLegendComponent;
  let fixture: ComponentFixture<ItemLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemLegendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
