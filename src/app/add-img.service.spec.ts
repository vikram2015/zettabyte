import { TestBed, inject } from '@angular/core/testing';

import { AddImgService } from './add-img.service';

describe('AddImgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddImgService]
    });
  });

  it('should be created', inject([AddImgService], (service: AddImgService) => {
    expect(service).toBeTruthy();
  }));
});
