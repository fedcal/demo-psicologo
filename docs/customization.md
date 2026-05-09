# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Psicologo'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `psicologo` con nome cliente (`acme-psicologia`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account

---

## Possibili Sviluppi Customizzabili per Psicologo/Psicoterapeuta

### 1. E2EE Jitsi Self-Hosted + WebRTC Insertable Streams
**Scope**: ~28h | **Tier**: Avanzato | **Valore**: Privacy suprema, differenziatore vs Serenis

Frame encryption client-side (TweetNaCl.js Curve25519). STUN/TURN Coturn on-prem. Compliance segreto professionale (Codice Penale Art.622).

### 2. PHQ-9/GAD-7 Mood Tracking + Sentiment AI
**Scope**: ~25h | **Tier**: Avanzato | **Valore**: Clinical outcomes tracking, TAC

Valutazione giornaliera pomeriggio (Ollama llama3.1:8b). Pattern detection: depressione/ansia gravità. Alert psicologo trend anomalo. GDPR Art.9 compliant.

### 3. Crisis Escalation Automatica
**Scope**: ~18h | **Tier**: Avanzato | **Valore**: Safety net, liability mitigation

PHQ-9 ≥27 OR crisis keyword → SMS alert psicologo + paziente visualizza hotline 1522. Ollama fallback: messaggio supportivo deterministico (es. "Respirare lentamente...").

### 4. Cartella Clinica Digitale + Audit Trail GDPR Art.17
**Scope**: ~30h | **Tier**: Avanzato | **Valore**: Compliance full, albo CNOP ready

PostgreSQL AES-256-GCM. RecordAmendment log (chi, quando, cosa editato). Right-to-erasure: anonimizzazione irreversibile. CNOP inspection ready.

### 5. Group Therapy Room (Janus Multi-Party)
**Scope**: ~24h | **Tier**: Avanzato | **Valore**: Group therapy stream, new revenue

Janus Gateway max 8 partecipanti. Moderator broadcast/mute control. No recording default (consent-first per privacy groupe). Whiteboard shared.

### 6. CBT Homework Interattivo Strutturato
**Scope**: ~20h | **Tier**: Avanzato | **Valore**: Between-session engagement, therapeutic continuity

Thought record form (Situation → Thought → Feeling → Behavior → Alternative). Exposure hierarchy visual tracker. Behavioral activation calendar. Auto-reminder.

### 7. Dashboard Outcome + AI Recommendation
**Scope**: ~22h | **Tier**: Avanzato | **Valore**: Evidenza-based decision support

PHQ-9 30-day trend + heatmap. AI-assisted recommendation (Spring Batch): "Paziente plateau settimana 8 — consider psicofarmaco consult". Psicologo review before share.

### 8. Fatturazione e-SDI + Marca Bollo Digitale
**Scope**: ~16h | **Tier**: Avanzato | **Valore**: Tax compliance, IVA 22%

FatturaPA XML auto-generation. Integrazione SdI Agenzia Entrate. Marca bollo €2 digitale (ArcaSoft/altro). Compliance IVA 22% psicoterapia privata.

### 9. Peer Supervision Private Channel
**Scope**: ~15h | **Tier**: Avanzato | **Valore**: Knowledge sharing, community, retro-referral

Accesso esclusivo psicologo-psicologo (Jitsi peer 4-6 colleghi). Discussioni anonimizzate caso. Credential verification CNOP auto. Referral network builder.

### 10. Crisis De-Escalation Chatbot 24h
**Scope**: ~19h | **Tier**: Premium | **Valore**: Safety net, reduce ER, liability

Ollama chatbot 24h (margin-positive). Paziente in crisi → stabilization script + SMS immediate alert psicologo. Compassionate tone, never replace human.

**Total**: 10 customizzazioni, €6k-10.5k, ROI 4-8 mesi per studio PMI 3-10 psicoterapeuti.
