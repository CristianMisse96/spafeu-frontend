import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';
import type { SwiperContainer } from 'swiper/element';
import { PdfInfo } from './interfaces/pdf-file.interface';
import { PDF_FILES } from './data/pdf-files';

register();

/**
 * Página de educación que presenta infografías en un carrusel interactivo.
 * El carrusel avanza automáticamente y permite navegación manual.
 */
@Component({
  selector: 'app-educacion',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './educacion.html',
  styleUrl: './educacion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EducacionPage implements AfterViewInit, OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);

  readonly pdfs = signal<PdfInfo[]>(
    PDF_FILES.map((pdf) => {
      const encodedName = encodeURIComponent(pdf.fileName);
      const baseUrl = `/educacion/infografia/${encodedName}`;
      return {
        ...pdf,
        viewerUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
          `${baseUrl}#toolbar=0&navpanes=0&scrollbar=0`
        ),
        downloadUrl: baseUrl,
      };
    })
  );

  readonly isPlaying = signal(true);
  readonly currentIndex = signal(0);
  readonly isReady = signal(false);
  readonly halfCount = computed(() => Math.ceil(this.pdfs().length / 2));

  private autoplayIntervalId: ReturnType<typeof setInterval> | null = null;
  private readonly autoplayDelay = 10000;

  readonly swiperContainer = viewChild.required<ElementRef<SwiperContainer>>(
    'swiperContainer'
  );

  ngAfterViewInit(): void {
    const container = this.swiperContainer().nativeElement;
    container.initialize();
    this.isReady.set(true);
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  toggleAutoplay(): void {
    this.isPlaying.update((value) => !value);
    if (this.isPlaying()) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  }

  goToSlide(index: number): void {
    const swiper = this.getSwiper();
    if (!swiper) return;
    swiper.slideToLoop(index);
    this.currentIndex.set(index);
    this.resetAutoplay();
  }

  goToPrevious(): void {
    const swiper = this.getSwiper();
    if (!swiper) return;
    swiper.slidePrev();
    this.currentIndex.set(swiper.realIndex);
    this.resetAutoplay();
  }

  goToNext(): void {
    const swiper = this.getSwiper();
    if (!swiper) return;
    swiper.slideNext();
    this.currentIndex.set(swiper.realIndex);
    this.resetAutoplay();
  }

  onSlideChange(event: Event): void {
    const swiper = (event.target as SwiperContainer).swiper;
    if (!swiper) return;
    this.currentIndex.set(swiper.realIndex);
  }

  private getSwiper() {
    return this.swiperContainer()?.nativeElement.swiper;
  }

  private startAutoplay(): void {
    if (!this.isReady()) return;
    this.autoplayIntervalId = setInterval(() => {
      this.goToNext();
    }, this.autoplayDelay);
  }

  private stopAutoplay(): void {
    if (this.autoplayIntervalId) {
      clearInterval(this.autoplayIntervalId);
      this.autoplayIntervalId = null;
    }
  }

  private resetAutoplay(): void {
    if (!this.isReady() || !this.isPlaying()) return;
    this.stopAutoplay();
    this.startAutoplay();
  }
}
