import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-aree-intervento',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Aree di intervento</h1>
        <p>Ogni difficoltà merita attenzione. Lo studio accompagna le persone in diversi percorsi di cambiamento.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="aree$ | async as data">
      <ul class="aree-list">
        <li *ngFor="let area of data.aree" class="area-item" [id]="area.id">
          <div class="area-item__header">
            <span class="area-item__icon" aria-hidden="true">{{ area.icona }}</span>
            <h2>{{ area.nome }}</h2>
          </div>
          <p class="area-item__desc">{{ area.descrizione }}</p>
          <div class="area-item__segnali">
            <h3>Alcuni segnali ricorrenti</h3>
            <ul>
              <li *ngFor="let s of area.segnali">{{ s }}</li>
            </ul>
          </div>
        </li>
      </ul>

      <aside class="info-box">
        <p>
          Non trovi la tua difficoltà nell'elenco? Non esitare a contattare lo studio:
          la lista non è esaustiva e valuteremo insieme se possiamo supportarti.
        </p>
        <a routerLink="/contatti" class="btn btn-primary">Richiedi il primo colloquio</a>
      </aside>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
        max-width: 560px;
        margin: 0 auto;
      }
      .content {
        padding: 3rem 1rem;
      }
      .aree-list {
        list-style: none;
        padding: 0;
        margin: 0 0 3rem;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
      }
      .area-item {
        padding: 2rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: #ffffff;
      }
      .area-item__header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      .area-item__icon {
        font-size: 1.75rem;
        flex-shrink: 0;
      }
      .area-item__header h2 {
        margin: 0;
        font-size: 1.25rem;
      }
      .area-item__desc {
        color: var(--color-fg-muted);
        line-height: 1.7;
        margin: 0 0 1.5rem;
        font-size: 0.95rem;
      }
      .area-item__segnali h3 {
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-fg-muted);
        margin: 0 0 0.5rem;
      }
      .area-item__segnali ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .area-item__segnali li {
        font-size: 0.82rem;
        padding: 0.3rem 0.75rem;
        border-radius: 9999px;
        background: #eef2ff;
        color: var(--color-accent);
        font-weight: 500;
      }
      .info-box {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
        text-align: center;
      }
      .info-box p {
        color: var(--color-fg-muted);
        margin: 0 0 1.25rem;
        line-height: 1.65;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #3730a3;
        color: #ffffff;
        text-decoration: none;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreeInterventoComponent {
  private readonly mockData = inject(MockDataService);

  readonly aree$ = this.mockData.aree$;
}
