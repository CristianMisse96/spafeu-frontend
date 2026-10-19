import { SafeResourceUrl } from '@angular/platform-browser';

/**
 * Datos base de un archivo PDF de educación.
 */
export interface PdfFile {
  id: number;
  title: string;
  description: string;
  fileName: string;
}

/**
 * Datos procesados de un PDF listos para renderizar en el carrusel.
 */
export interface PdfInfo extends PdfFile {
  viewerUrl: SafeResourceUrl;
  downloadUrl: string;
}
