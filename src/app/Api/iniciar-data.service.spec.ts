import { TestBed } from '@angular/core/testing';

import { IniciarDataService } from './iniciar-data.service';

describe('IniciarDataService', () => {
  let service: IniciarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IniciarDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
