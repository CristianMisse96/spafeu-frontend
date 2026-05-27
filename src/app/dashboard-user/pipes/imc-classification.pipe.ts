import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imcClassification',
})
export class ImcClassificationPipe implements PipeTransform {

    transform(imc: number | null | undefined): string {

        if (imc == null) {
            return '';
        }

        if (imc < 18.5) {
            return 'Bajo peso';
        }

        if (imc <= 24.9) {
            return 'Peso normal';
        }

        if (imc <= 29.9) {
            return 'Sobrepeso';
        }

        if (imc <= 34.9) {
            return 'Obesidad grado I';
        }

        if (imc <= 39.9) {
            return 'Obesidad grado II';
        }

        return 'Obesidad grado III';
    }

}