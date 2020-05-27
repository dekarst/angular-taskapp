import { TestBed } from '@angular/core/testing';

import { UserUniqueService } from './user-unique.service';

describe('UserUniqueService', () => {
  let service: UserUniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
