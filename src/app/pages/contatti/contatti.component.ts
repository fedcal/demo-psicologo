import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Primo colloquio e contatti</h1>
        <p>Compila il modulo per richiedere il primo colloquio. Ti risponderemo entro 24 ore nei giorni lavorativi.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">

        <section class="info-block">
          <h2>Informazioni studio</h2>
          <p class="albo">{{ info.albo }}</p>

          <h3>Indirizzo</h3>
          <address>
            {{ info.indirizzo.via }}<br>
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})
          </address>

          <h3>Contatti diretti</h3>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="waLink(info.contatti.whatsapp)" target="_blank" rel="noopener">{{ info.contatti.whatsapp }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h3>Orari di ricevimento</h3>
          <ul class="orari-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span class="chiuso">{{ info.orari.domenica }}</span></li>
          </ul>

          <aside class="tariffe-mini">
            <h3>Tariffe</h3>
            <ul>
              <li>Primo colloquio (60 min): <strong>€{{ info.tariffe.primoColloquioEuro }}</strong></li>
              <li>Seduta in studio (50 min): <strong>€{{ info.tariffe.studioEuro }}</strong></li>
              <li>Seduta online (50 min): <strong>€{{ info.tariffe.onlineEuro }}</strong></li>
            </ul>
            <p class="detrazione-nota">Detraibili al 19% nella dichiarazione dei redditi.</p>
          </aside>
        </section>

        <section class="form-block">
          <h2>Richiesta primo colloquio</h2>

          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou" novalidate>

            <div class="field">
              <label for="nome">Nome e cognome <span class="req" aria-hidden="true">*</span></label>
              <input
                id="nome"
                type="text"
                formControlName="nome"
                autocomplete="name"
                [class.is-invalid]="isInvalid('nome')"
                aria-required="true"
              />
              <span class="error" *ngIf="isInvalid('nome')" role="alert">Inserisci nome e cognome (min. 2 caratteri).</span>
            </div>

            <div class="field">
              <label for="email">Email <span class="req" aria-hidden="true">*</span></label>
              <input
                id="email"
                type="email"
                formControlName="email"
                autocomplete="email"
                [class.is-invalid]="isInvalid('email')"
                aria-required="true"
              />
              <span class="error" *ngIf="isInvalid('email')" role="alert">Inserisci un indirizzo email valido.</span>
            </div>

            <div class="field">
              <label for="telefono">Telefono <span class="req" aria-hidden="true">*</span></label>
              <input
                id="telefono"
                type="tel"
                formControlName="telefono"
                autocomplete="tel"
                [class.is-invalid]="isInvalid('telefono')"
                aria-required="true"
                placeholder="Es. +39 333 000 1234"
              />
              <span class="error" *ngIf="isInvalid('telefono')" role="alert">Inserisci un numero di telefono valido.</span>
            </div>

            <div class="field">
              <label for="area">Area di interesse</label>
              <select id="area" formControlName="area">
                <option value="">— Seleziona (facoltativo) —</option>
                <option value="ansia">Ansia e preoccupazione</option>
                <option value="depressione">Umore basso e depressione</option>
                <option value="attacchi-panico">Attacchi di panico</option>
                <option value="coppia">Difficoltà di coppia</option>
                <option value="famiglia">Relazioni familiari</option>
                <option value="lutto">Lutto e perdita</option>
                <option value="alimentazione">Disturbi del comportamento alimentare</option>
                <option value="adolescenti">Adolescenti e giovani adulti</option>
                <option value="altro">Altro / non so ancora</option>
              </select>
            </div>

            <div class="field">
              <label for="modalita">Modalità preferita</label>
              <select id="modalita" formControlName="modalita">
                <option value="">— Seleziona (facoltativo) —</option>
                <option value="studio">In studio (Via Manzoni 28, Milano)</option>
                <option value="online">Online</option>
                <option value="domicilio">A domicilio</option>
              </select>
            </div>

            <div class="field">
              <label for="urgenza">Quanto è urgente per te iniziare?</label>
              <select id="urgenza" formControlName="urgenza">
                <option value="">— Seleziona (facoltativo) —</option>
                <option value="subito">Prima possibile</option>
                <option value="settimane">Nelle prossime settimane</option>
                <option value="mese">Entro il prossimo mese</option>
              </select>
            </div>

            <div class="field">
              <label for="messaggio">Breve descrizione (opzionale)</label>
              <textarea
                id="messaggio"
                formControlName="messaggio"
                rows="3"
                placeholder="Puoi descrivere brevemente il motivo della richiesta, se lo desideri."
              ></textarea>
              <span class="hint">Non è obbligatorio: puoi lasciarla vuota.</span>
            </div>

            <div class="field field--checkbox">
              <input
                id="privacy"
                type="checkbox"
                formControlName="privacy"
                aria-required="true"
                [class.is-invalid]="isInvalid('privacy')"
              />
              <label for="privacy">
                Acconsento al trattamento dei miei dati personali, inclusi i dati relativi alla salute
                (categorie particolari ai sensi dell'<strong>art. 9 GDPR</strong>), per ricevere una risposta
                alla presente richiesta di colloquio. <span class="req" aria-hidden="true">*</span>
              </label>
            </div>
            <span class="error" *ngIf="isInvalid('privacy')" role="alert">Il consenso al trattamento dei dati sanitari è obbligatorio per procedere.</span>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              Invia richiesta
            </button>
            <p class="disclaimer">
              Demo non funzionale: nessun dato viene inviato. In un sito reale riceveresti conferma entro 24h.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou-icon" aria-hidden="true">✅</span>
              <h3>Grazie {{ form.value['nome'] }}!</h3>
              <p>
                La tua richiesta è stata simulata con successo. In un sito reale,
                riceveresti una conferma via email entro 24 ore nei giorni lavorativi.
              </p>
              <p>
                Ti ricordiamo che i tuoi dati sanitari sono trattati nel pieno rispetto
                del segreto professionale e del GDPR art. 9.
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Invia un'altra richiesta</button>
            </div>
          </ng-template>
        </section>

      </div>

      <section class="faq-section" *ngIf="faq$ | async as faqData">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let f of faqData.faq" class="faq-item">
            <h3>{{ f.domanda }}</h3>
            <p>{{ f.risposta }}</p>
          </li>
        </ul>
      </section>
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
      .page-header p { color: var(--color-fg-muted); margin: 0 auto; max-width: 520px; }
      .content { padding: 3rem 1rem; }
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
        margin-bottom: 4rem;
      }
      .info-block h2 { margin: 0 0 0.5rem; }
      .albo { font-size: 0.82rem; color: var(--color-fg-muted); margin: 0 0 1.5rem; font-style: italic; }
      .info-block h3 { font-size: 1rem; margin: 1.5rem 0 0.5rem; }
      address { font-style: normal; color: var(--color-fg-muted); font-size: 0.95rem; line-height: 1.6; }
      .contact-list { list-style: none; padding: 0; margin: 0; }
      .contact-list li { margin-bottom: 0.4rem; font-size: 0.9rem; }
      .orari-list { list-style: none; padding: 0; margin: 0; }
      .orari-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.88rem;
      }
      .chiuso { color: var(--color-danger); font-weight: 500; }
      .tariffe-mini {
        margin-top: 1.5rem;
        padding: 1.25rem;
        background: #eef2ff;
        border-radius: var(--radius-md);
        border: 1px solid #c7d2fe;
      }
      .tariffe-mini h3 { margin: 0 0 0.75rem; font-size: 0.95rem; color: var(--color-accent); }
      .tariffe-mini ul { list-style: none; padding: 0; margin: 0 0 0.5rem; }
      .tariffe-mini li { font-size: 0.88rem; margin-bottom: 0.3rem; color: var(--color-fg-muted); }
      .detrazione-nota { font-size: 0.78rem; color: var(--color-fg-muted); margin: 0; font-style: italic; }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
      }
      .form-block h2 { margin: 0 0 1.5rem; }
      .field {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .req { color: var(--color-danger); margin-left: 2px; }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field input.is-invalid,
      .field select.is-invalid,
      .field input[type="checkbox"].is-invalid {
        border-color: var(--color-danger);
      }
      .error {
        font-size: 0.8rem;
        color: var(--color-danger);
        margin-top: 0.25rem;
      }
      .hint {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        margin-top: 0.25rem;
        font-style: italic;
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }
      .field--checkbox input[type="checkbox"] { margin-top: 0.2rem; flex-shrink: 0; }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        line-height: 1.55;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
        margin-top: 0.5rem;
      }
      .btn-primary { background: var(--color-accent); color: #ffffff; }
      .btn-primary:hover:not(:disabled) { background: #3730a3; }
      .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
      }
      .thankyou { text-align: center; padding: 2rem 0; }
      .thankyou-icon { font-size: 2.5rem; display: block; margin-bottom: 1rem; }
      .thankyou h3 { margin: 0 0 1rem; color: var(--color-success); }
      .thankyou p { color: var(--color-fg-muted); font-size: 0.9rem; margin: 0 0 0.75rem; line-height: 1.65; }
      .faq-section { padding-top: 3rem; border-top: 1px solid var(--color-border); }
      .faq-section h2 { margin: 0 0 2rem; }
      .faq-list { list-style: none; padding: 0; margin: 0; }
      .faq-item {
        padding: 1.5rem 0;
        border-bottom: 1px solid var(--color-border);
      }
      .faq-item:last-child { border-bottom: none; }
      .faq-item h3 { margin: 0 0 0.5rem; font-size: 1rem; }
      .faq-item p { margin: 0; color: var(--color-fg-muted); font-size: 0.9rem; line-height: 1.65; }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly faq$ = this.mockData.faq$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9()\s\-]{6,}$/)]],
    area: [''],
    modalita: [''],
    urgenza: [''],
    messaggio: [''],
    privacy: [false, Validators.requiredTrue]
  });

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  waLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    } else {
      this.form.markAllAsTouched();
    }
  }

  reset(): void {
    this.form.reset({ privacy: false });
    this.submitted.set(false);
  }
}
