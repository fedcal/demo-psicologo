import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Professionisti iscritti all'Albo, con formazione certificata e anni di esperienza clinica.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="mission">
        <h2>Lo studio</h2>
        <p>
          Lo Studio Bianchi nasce nel 2010 con la convinzione che ogni persona possa trovare
          risorse interiori per affrontare le proprie difficoltà, con il giusto supporto.
          L'approccio cognitivo-comportamentale, fondato su evidenze scientifiche solide,
          offre strumenti concreti e misurabili per il cambiamento.
        </p>
        <p>
          Il team è composto da psicologi e psicoterapeuti abilitati, iscritti all'Albo degli
          Psicologi della Lombardia, con formazioni complementari che permettono di rispondere
          a un'ampia gamma di richieste di supporto psicologico.
        </p>
        <p>
          Lo studio aderisce scrupolosamente al Codice Deontologico degli Psicologi italiani.
          La riservatezza, il rispetto della persona e l'aggiornamento continuo sono valori
          fondanti di ogni pratica clinica.
        </p>
      </section>

      <section class="valori">
        <h2>I nostri principi</h2>
        <ul class="valori-grid">
          <li>
            <h3>Evidenza scientifica</h3>
            <p>Utilizziamo approcci con solida base di ricerca: efficacia documentata, non improvvisazione.</p>
          </li>
          <li>
            <h3>Rispetto e riservatezza</h3>
            <p>Il segreto professionale è un obbligo deontologico e legale. I tuoi dati non escono dallo studio.</p>
          </li>
          <li>
            <h3>Aggiornamento continuo</h3>
            <p>I professionisti del team partecipano a supervisioni, formazioni e congressi ogni anno.</p>
          </li>
          <li>
            <h3>Collaborazione in rete</h3>
            <p>Quando necessario, lavoriamo con medici, psichiatri e altri specialisti per il tuo benessere.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as teamData">
        <h2>Il team</h2>
        <ul class="team-list">
          <li *ngFor="let m of teamData.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(5) }}</div>
            <div class="team-card__body">
              <h3>{{ m.nome }}</h3>
              <p class="team-card__ruolo">{{ m.ruolo }}</p>
              <p class="team-card__bio">{{ m.bio }}</p>
              <ul class="team-card__titoli">
                <li *ngFor="let t of m.titoli">{{ t }}</li>
              </ul>
              <div class="team-card__meta">
                <span class="meta-item">{{ m.anniEsperienza }} anni di esperienza</span>
                <span *ngFor="let l of m.lingue" class="meta-item meta-item--lingua">{{ l }}</span>
              </div>
              <ul class="team-card__spec">
                <li *ngFor="let s of m.specializzazioni">{{ s }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <aside class="cta-box">
        <p>Vuoi sapere se lo studio è adatto alle tue esigenze? Il primo colloquio è un momento di conoscenza reciproca, senza impegni.</p>
        <a routerLink="/contatti" class="btn btn-primary">Prenota il primo colloquio</a>
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
      .page-header h1 { margin: 0 0 0.5rem; }
      .page-header p { color: var(--color-fg-muted); margin: 0 auto; max-width: 480px; }
      .content { padding: 3rem 1rem; }
      .mission {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .mission h2 { margin-bottom: 1rem; }
      .mission p {
        line-height: 1.75;
        color: var(--color-fg-muted);
        margin-bottom: 1rem;
        font-size: 0.97rem;
      }
      .valori { margin-bottom: 4rem; }
      .valori h2 { text-align: center; margin-bottom: 2rem; }
      .valori-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .valori-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .valori-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-accent);
      }
      .valori-grid p { margin: 0; color: var(--color-fg-muted); font-size: 0.9rem; line-height: 1.55; }
      .team h2 { text-align: center; margin-bottom: 2rem; }
      .team-list {
        list-style: none;
        padding: 0;
        margin: 0 0 4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .team-card {
        display: flex;
        gap: 1.5rem;
        padding: 2rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background: #ffffff;
      }
      .team-card__avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.75rem;
        font-weight: 700;
        flex-shrink: 0;
      }
      .team-card__body { flex: 1; min-width: 0; }
      .team-card h3 { margin: 0 0 0.25rem; font-size: 1.15rem; }
      .team-card__ruolo {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__bio {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.65;
        margin-bottom: 1rem;
      }
      .team-card__titoli {
        list-style: none;
        padding: 0;
        margin: 0 0 0.75rem;
      }
      .team-card__titoli li {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        padding: 0.15rem 0;
        border-left: 2px solid var(--color-border);
        padding-left: 0.5rem;
        margin-bottom: 0.25rem;
      }
      .team-card__meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 0.75rem;
      }
      .meta-item {
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
        border: 1px solid var(--color-border);
      }
      .meta-item--lingua {
        background: #e0f2fe;
        color: #0369a1;
        border-color: #bae6fd;
      }
      .team-card__spec {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .team-card__spec li {
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        background: #eef2ff;
        color: var(--color-accent);
        font-weight: 500;
      }
      .cta-box {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2.5rem;
        text-align: center;
      }
      .cta-box p { color: var(--color-fg-muted); margin: 0 0 1.5rem; line-height: 1.65; }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:hover { background: #3730a3; color: #ffffff; text-decoration: none; }
      @media (max-width: 600px) {
        .team-card { flex-direction: column; }
        .team-card__avatar { width: 56px; height: 56px; font-size: 1.25rem; }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
}
