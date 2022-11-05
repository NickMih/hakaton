import { AppService } from './app.service';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field';


export function appServiceFactory(appService: AppService): () => void {
  return () => appService.initializeApp();
}

export const DEFAULT_FORM_FIELD_OPTIONS: MatFormFieldDefaultOptions = {
  appearance: 'outline',
  floatLabel: 'always'
};

export const IgnoreBarHttpHeader = { ignoreLoadingBar: 'true' };
