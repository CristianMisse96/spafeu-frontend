import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'imcSeverity'
})

export class ImcSeverityPipe implements PipeTransform {
    transform(imc: number): string {

        if (imc < 18.5) {
            return 'warn';
        }

        if (imc <= 24.9) {
            return 'success';
        }

        if (imc <= 29.9) {
            return 'warning';
        }

        return 'danger';
    }
}