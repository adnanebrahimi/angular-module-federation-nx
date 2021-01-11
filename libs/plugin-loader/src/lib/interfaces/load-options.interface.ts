import { Router } from '@angular/router';

export default interface LoadOptionsInterface {
  production: boolean;
  router?: Router;
  routePath?: string;
}
