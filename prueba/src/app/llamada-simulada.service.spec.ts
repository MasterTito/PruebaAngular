import { TestBed } from '@angular/core/testing';

import { LlamadaSimuladaService } from './llamada-simulada.service';

describe('LlamadaSimuladaService', () => {
  let service: LlamadaSimuladaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlamadaSimuladaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
