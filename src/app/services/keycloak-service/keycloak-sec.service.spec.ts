import { TestBed } from '@angular/core/testing';

import { KeycloakSecService } from './keycloak-sec.service';

describe('KeycloakSecService', () => {
  let service: KeycloakSecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakSecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
