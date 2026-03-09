# EDMI — Mobile App für zahnmedizinische Mikroskope

## Produktpräsentation

---

## Über das Projekt

**EDMI** ist eine voll funktionsfähige mobile Anwendung für das Unternehmen EDMI (edmi.com.ua), einen führenden Anbieter von zahnmedizinischen Mikroskopen und optischer Ausrüstung in der Ukraine und Europa.

Die App bietet Zahnärzten direkten Zugang zum Gerätekatalog, einem interaktiven Mikroskop-Konfigurator, einem KI-Assistenten und AR-Visualisierung — direkt vom Smartphone aus.

---

## App-Funktionen

### 1. Produktkatalog

Ein vollständiger Katalog zahnmedizinischer Mikroskope mit **Echtzeit-Synchronisierung** mit der Hauptwebsite edmi.com.ua über die WooCommerce-API.

- Startseite im Stil führender Marktplätze (Rozetka-Style)
- Hero-Bereich mit Verlaufshintergrund und Suchfunktion
- Quick-Action-Buttons für schnellen Zugriff auf Kernfunktionen
- Empfehlungen und Top-Angebote
- Kategorienraster mit echten Produktbildern
- Markenfilter und Sortierung
- Produktkarten mit Preisen, Rabatten und Verfügbarkeitsstatus

### 2. Produktdetailseite (PDP)

Detaillierte Darstellung jedes Mikroskops:

- Fotogalerie mit Paginierung und Wisch-Navigation
- Badges: Neu / Gebraucht / Rabatt
- Technische Daten in aufklappbaren Akkordeons
- Liefer- und Zahlungsinformationen
- B2B-Button: „Angebot anfordern"
- Verwandte Produkte
- Untere Leiste: Vergleichen, Warenkorb, Favoriten, „Kaufen"

### 3. Mikroskop-Konfigurator

Eine einzigartige Funktion — **interaktive Mikroskop-Zusammenstellung** nach Kundenbedürfnissen:

- Auswahl aus 4 Modellen: Zeiss Pico Mora, Zeiss PROergo, Leica M320, CJ-Optik Flexion
- 5 Optionsgruppen: Farbe, Halterung, Beleuchtung, Objektiv, Kamera
- Reale Preisdifferenzen in Euro für jede Option
- Kostenberechnung in Echtzeit
- Fotokarussell des ausgewählten Modells
- Konfiguration mit einem Fingertipp zum Warenkorb hinzufügen

### 4. EDMik — KI-Assistent

Der integrierte Chatbot **EDMik** ist auf jedem Bildschirm verfügbar:

- Floating Action Button (EDMI-Markenfarbe Lila)
- Absichtserkennung über 73 Schlüsselwörter
- 8 Antworttypen: Empfehlungen, Navigation, Produktkarten
- Quick Actions: „Nachbestellen", „Bestellstatus", „Manager kontaktieren"
- Produktkarten direkt im Chat mit Navigation zur Produktseite
- Vorbereitet für Claude-KI- und Spracheingabe-Integration

### 5. AR-Visualisierung — „In Ihrer Praxis ansehen"

Augmented-Reality-Technologie zur Vorschau des Mikroskops im eigenen Raum:

- Vollbild-AR-Modus mit der Gerätekamera
- Automatische Erkennung horizontaler Oberflächen
- Platzierung eines 3D-Mikroskopmodells mit einem Fingertipp
- Gesten: Verschieben, Zwei-Finger-Drehung, Pinch-to-Zoom
- Position zurücksetzen und erneut platzieren
- Fallback-Bildschirm für Geräte ohne AR-Unterstützung

### 6. Warenkorb & Checkout

Ein vollständiger Kaufprozess:

- Warenkorb mit Mengenverwaltung (+/-), Entfernen und Leeren
- 4-Schritte-Checkout: Kontaktdaten → Lieferung → Zahlung → Bestätigung
- LiqPay- und WayForPay-Unterstützung (Integration vorbereitet)
- Nova-Poshta-Integration für den Versand
- Bestellübersicht mit Aufschlüsselung

### 7. Profil & Bestellungen

- Authentifizierung (Telefon / E-Mail)
- Bestellverlauf mit Statusfilterung
- Bestelldetails mit Timeline-Tracking
- Favoriten / Wunschliste
- Sprachumschaltung (UK / EN)

---

## Technische Architektur

### Technologie-Stack

| Schicht | Technologie |
|---------|------------|
| **Mobile** | React Native + Expo SDK 54 (New Architecture) |
| **Navigation** | expo-router v6 (dateibasiertes Routing) |
| **State** | Zustand v5 (7 Stores) + TanStack Query v5 |
| **UI** | Eigenes Design-System (37 Komponenten) |
| **3D / AR** | @reactvision/react-viro (ViroReact) |
| **i18n** | i18next + react-i18next (Ukrainisch, Englisch) |
| **Backend** | Node.js + Express + PostgreSQL + Redis |
| **API** | WooCommerce Store API (öffentlich, echte Daten) |
| **KI** | Anthropic Claude API (vorbereitet) |
| **Typisierung** | TypeScript (Strict Mode) |

### Projektarchitektur

```
edmi/
├── apps/
│   ├── mobile/          ← React Native (Expo)
│   │   ├── app/         ← 18 Routen (dateibasiertes Routing)
│   │   ├── components/  ← 37 React-Komponenten
│   │   ├── stores/      ← 7 Zustand Stores
│   │   ├── hooks/       ← TanStack Query Hooks
│   │   └── screens/     ← Lazy-geladene Bildschirme (AR)
│   └── admin/           ← Admin-Panel (Vite + React)
├── packages/
│   ├── shared/          ← 24 Module (Typen, Validatoren, Mocks, i18n)
│   └── server/          ← Express-Middleware-Server
└── docs/                ← Dokumentation (6 Dateien)
```

### Wichtige Architekturentscheidungen

1. **Monorepo (pnpm Workspaces)** — einheitliche Codebasis für Mobile, Server, Admin und Shared-Paket
2. **WooCommerce als Single Source of Truth** — echte Daten von der Website, keine Duplikate
3. **Shared-Paket** — Typen, Validatoren und Übersetzungen werden sowohl auf Client als auch Server genutzt
4. **Offline-fähig** — TanStack Query + AsyncStorage für Katalog-Caching
5. **Lazy Loading für AR** — ViroReact wird nur beim Navigieren zum AR-Bildschirm geladen
6. **Serverseitige Signaturen** — alle kryptografischen Operationen ausschließlich auf dem Server

---

## Das Projekt in Zahlen

| Kennzahl | Wert |
|----------|------|
| Bildschirme / Routen | 18 |
| React-Komponenten | 37 |
| Zustand Stores | 7 |
| Shared-Module | 24 |
| Oberflächensprachen | 2 (UK, EN) |
| Projektdokumente | 6 |
| Behobene Fehler | 11 |
| 3D-Modelle | 1 (Microscope.glb, 30 MB) |
| Entwicklungsphasen | 8 abgeschlossen |

---

## Schätzung der Entwicklungskosten

### Wenn eine Outsourcing-Agentur dies gebaut hätte

Die Entwicklung einer App dieses Kalibers bei einer Agentur würde erfordern:

| Rolle | Stunden | Stundensatz ($/Std.) | Kosten |
|-------|---------|---------------------|--------|
| UI/UX-Designer | 120-160 | $50-80 | $6.000-12.800 |
| Mobile-Entwickler (React Native) | 500-700 | $60-100 | $30.000-70.000 |
| Backend-Entwickler | 200-300 | $60-100 | $12.000-30.000 |
| QA-Ingenieur | 100-150 | $40-60 | $4.000-9.000 |
| Projektmanager | 80-120 | $50-70 | $4.000-8.400 |
| DevOps / Infrastruktur-Setup | 40-60 | $60-80 | $2.400-4.800 |
| **GESAMT** | **1.040-1.490 Std.** | | **$58.400-135.000** |

**Durchschnittliche Marktkosten: $80.000 — $120.000**

**Agentur-Zeitplan: 3-5 Monate** mit einem Team von 4-5 Personen.

### Wie es tatsächlich gebaut wurde

| Parameter | Wert |
|-----------|------|
| **Entwicklungszeit** | ~4 Tage |
| **Budget** | $0 |
| **Team** | 1 Person + Claude KI |
| **Methode** | KI-gesteuerte Entwicklung (Claude Code) |

Einsparung: **$80.000-120.000** und **3-5 Monate** Entwicklungszeit.

---

## Entwicklungsmethodik

### KI-gesteuerte Architektur

Das Projekt wurde mit der Methode **AI-augmented Development** realisiert — wobei der Architekt (Mensch) die Vision definiert und der KI-Assistent (Claude) die Implementierung übernimmt.

**So hat es funktioniert:**

1. **Strategische Planung** — der Entwickler legte Phasen, Prioritäten und Architekturentscheidungen fest
2. **Recherche & Analyse** — KI-Agenten untersuchten gleichzeitig die Codebasis, API-Dokumentation und Abhängigkeiten
3. **Strukturelles Design** — jeder Phasenplan wurde vor der Implementierung genehmigt
4. **Iterative Umsetzung** — phasenweise Erstellung mit Tests auf echten Geräten nach jeder Etappe
5. **Sofortiges Debugging** — Fehler wurden von Agenten mit Nachweisen aus dem Quellcode analysiert

**Warum es funktioniert:**

- Der Architekt konzentriert sich auf das **Was** und **Warum**, die KI kümmert sich um das **Wie**
- Jede Entscheidung wird dokumentiert und begründet
- Parallele Untersuchung: 3 KI-Agenten analysieren gleichzeitig verschiedene Aspekte einer Aufgabe
- Null technische Schulden — striktes TypeScript, Validierung bei jedem Schritt
- Vollständige Projektdokumentation wird während des Entwicklungsprozesses erstellt

---

## Einzigartige Vorteile

### Für das EDMI-Geschäft

- **Direkter Vertriebskanal** — unter Umgehung von Marktplätzen
- **AR-Demonstration** — Kunden sehen das Mikroskop in ihrer Praxis vor dem Kauf
- **Konfigurator** — erhöht den durchschnittlichen Bestellwert durch Up-Sell-Optionen
- **KI-Assistent** — reduziert die Arbeitsbelastung der Vertriebsmanager
- **Offline-Katalog** — funktioniert auch ohne Internetverbindung

### Für Zahnärzte

- **Professionelles Werkzeug** — nicht nur ein Shop, sondern ein Assistent bei der Geräteauswahl
- **AR-Vorschau** — objektive Beurteilung der Mikroskop-Dimensionen im realen Raum
- **B2B-Funktionen** — Angebotsanfragen, Bestellverlauf
- **Mehrsprachig** — Ukrainische und Englische Benutzeroberfläche

---

## Status & Roadmap

### Was fertig ist (v0.1.0)

- [x] Vollständiger Katalog mit echten WooCommerce-Daten
- [x] Detaillierte Produktseiten
- [x] Warenkorb und 4-Schritte-Checkout
- [x] Bestellungen und Tracking
- [x] Mikroskop-Konfigurator
- [x] EDMik-KI-Chatbot
- [x] AR-Visualisierung
- [x] Authentifizierung und Profil
- [x] Mehrsprachige Benutzeroberfläche

### Nächste Schritte

- [ ] Claude-KI-Integration für einen vollwertigen KI-Assistenten
- [ ] Spracheingabe (Whisper API)
- [ ] Live-Zahlungsintegration (LiqPay, WayForPay)
- [ ] Push-Benachrichtigungen (Firebase)
- [ ] Admin-Panel mit KI-Assistent für die Bewertung gebrauchter Geräte
- [ ] Veröffentlichung im App Store und Google Play

---

**EDMI Mobile App v0.1.0**
Entwickelt in 4 Tagen | $0 Budget | Powered by Claude KI

*edmi.com.ua*
