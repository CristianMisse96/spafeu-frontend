import { PdfFile } from '../interfaces/pdf-file.interface';

/**
 * Listado de infografías disponibles en la sección de educación.
 */
export const PDF_FILES: PdfFile[] = [
  {
    id: 1,
    title: 'Beneficios de la actividad física',
    description:
      'Descubre cómo el movimiento regular mejora tu salud física y mental.',
    fileName: 'Infografia_1.pdf',
  },
  {
    id: 2,
    title: 'Rutinas de ejercicio',
    description:
      'Guías prácticas para planificar tus sesiones de entrenamiento.',
    fileName: 'Infografia_2.pdf',
  },
  {
    id: 3,
    title: 'Nutrición y bienestar',
    description:
      'Consejos de alimentación que potencian tu rendimiento diario.',
    fileName: 'Infografia_3.pdf',
  },
  {
    id: 4,
    title: 'Hábitos saludables',
    description:
      'Pequeños cambios que generan grandes beneficios en tu estilo de vida.',
    fileName: 'Infografia_4.pdf',
  },
];
