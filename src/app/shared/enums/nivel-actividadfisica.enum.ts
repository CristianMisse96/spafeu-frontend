export enum NivelActividadFisicaEnum{
    NIVEL_1= "Sedentario",
    NIVEL_2= "Actividad Leve",
    NIVEL_3= "Actividad moderada",
    NIVEL_4= "Actividad vigorosa"
}

export const obtenerKeyPorValor = ( valorBuscado: string): keyof typeof NivelActividadFisicaEnum | undefined => {

    return (Object.keys(NivelActividadFisicaEnum) as Array<keyof typeof NivelActividadFisicaEnum>)
        .find(
            key => NivelActividadFisicaEnum[key] === valorBuscado
        );
};