import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import type { ModalOptions, ModalInterface } from 'flowbite'
import { NavbarComponent } from './features/navbar/navbar.component';
import { FooterComponent } from './features/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ThemeService } from './core/theme/theme.service';
// import { register } from 'swiper/element/bundle';
// register();
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  readonly theme = inject(ThemeService);
  novaLoaderTemplate = `
  <div class="nova-loader">

    <!-- Ambient Glow -->
    <div class="loader-glow"></div>

    <!-- 3D Scene -->
    <div class="nova-scene">

      <!-- Orbit Rings -->
      <div class="nova-orbit orbit-one">
        <span class="orbit-point"></span>
      </div>

      <div class="nova-orbit orbit-two">
        <span class="orbit-point"></span>
      </div>

      <div class="nova-orbit orbit-three">
        <span class="orbit-point"></span>
      </div>

      <!-- NOVA Logo -->
      <div class="nova-logo-3d">
        <span>N</span>
        <span>O</span>
        <span>V</span>
        <span>A</span><span class="nova-dot">.</span>
      </div>

      <!-- Ground Shadow -->
      <div class="nova-ground"></div>

    </div>

    <!-- Loading Text -->
    <div class="nova-loading-content">

      <div class="nova-loading-line">
        <span></span>
      </div>

      <p class="nova-loading-text">
        PREPARING YOUR EXPERIENCE
      </p>

      <span class="nova-tagline">
        FASHION FIRST. EVERYTHING ELSE, CURATED.
      </span>

    </div>

  </div>
`;


  protected readonly title = signal('e-commerce');
}
