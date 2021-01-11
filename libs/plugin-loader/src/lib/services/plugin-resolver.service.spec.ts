import { TestBed } from '@angular/core/testing';

import { PluginResolverService } from '@cac-pos/plugin-loader';

describe('PluginResolverService', () => {
  let service: PluginResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
