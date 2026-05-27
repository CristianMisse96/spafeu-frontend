import { Pipe, PipeTransform } from '@angular/core';
import { NivelActividadFisicaEnum } from '@shared/enums/nivel-actividadfisica.enum';


@Pipe({
    name: 'activityLevelSeverity'
})
export class ActivityLevelSeverityPipe implements PipeTransform {

    transform(
        nivel: NivelActividadFisicaEnum | null | undefined
    ): 'success' | 'info' | 'warn' | 'danger' {

        switch (nivel) {

            case NivelActividadFisicaEnum.NIVEL_1:
                return 'danger';

            case NivelActividadFisicaEnum.NIVEL_2:
                return 'warn';

            case NivelActividadFisicaEnum.NIVEL_3:
                return 'info';

            case NivelActividadFisicaEnum.NIVEL_4:
                return 'success';

            default:
                return 'info';
        }

    }

}