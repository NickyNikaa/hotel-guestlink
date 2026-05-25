import { cookies } from "next/headers";

export type Lang = "de" | "en" | "it" | "fr" | "es";

export const SUPPORTED_LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "es", flag: "🇪🇸", label: "Español" },
];

const DICT = {
  // Greeting + room
  welcome: { de: "Willkommen", en: "Welcome", it: "Benvenuti", fr: "Bienvenue", es: "Bienvenidos" },
  room: { de: "Zimmer", en: "Room", it: "Stanza", fr: "Chambre", es: "Habitación" },

  // Main menu
  howCanWeHelp: {
    de: "Wie können wir helfen?",
    en: "How can we help?",
    it: "Come possiamo aiutarvi?",
    fr: "Comment pouvons-nous vous aider ?",
    es: "¿Cómo podemos ayudarle?",
  },
  footerNote: {
    de: "Anfragen erscheinen direkt an der Rezeption. Bei dringenden Anliegen bitte anrufen.",
    en: "Requests appear directly at the reception. For urgent matters please call.",
    it: "Le richieste arrivano direttamente alla reception. Per questioni urgenti, vi preghiamo di chiamare.",
    fr: "Les demandes arrivent directement à la réception. Pour les urgences, veuillez appeler.",
    es: "Las solicitudes llegan directamente a la recepción. Para asuntos urgentes, llame por favor.",
  },

  // Navigation
  backToMenu: {
    de: "Zurück zum Menü",
    en: "Back to menu",
    it: "Torna al menu",
    fr: "Retour au menu",
    es: "Volver al menú",
  },
  back: { de: "Zurück", en: "Back", it: "Indietro", fr: "Retour", es: "Volver" },
  cancel: { de: "Abbrechen", en: "Cancel", it: "Annulla", fr: "Annuler", es: "Cancelar" },

  // Thank-you page
  notedTitle: { de: "Notiert", en: "Noted", it: "Annotato", fr: "Noté", es: "Anotado" },
  notedBody: {
    de: "Ihre Anfrage wurde an unser Team weitergeleitet. Wir kümmern uns in den nächsten ca. 15 Minuten darum.",
    en: "Your request has been forwarded to our team. We will take care of it within the next ~15 minutes.",
    it: "La vostra richiesta è stata inoltrata al nostro team. Ce ne occuperemo nei prossimi ~15 minuti.",
    fr: "Votre demande a été transmise à notre équipe. Nous nous en occupons dans les ~15 prochaines minutes.",
    es: "Su solicitud ha sido enviada a nuestro equipo. Nos ocuparemos en los próximos ~15 minutos.",
  },
  backToServiceMenu: {
    de: "Zurück zum Service-Menü",
    en: "Back to service menu",
    it: "Torna al menu servizi",
    fr: "Retour au menu service",
    es: "Volver al menú de servicio",
  },

  // Scheduled form
  date: { de: "Datum", en: "Date", it: "Data", fr: "Date", es: "Fecha" },
  timeWindow: {
    de: "Zeitfenster",
    en: "Time slot",
    it: "Fascia oraria",
    fr: "Créneau horaire",
    es: "Franja horaria",
  },
  morning: { de: "Vormittag", en: "Morning", it: "Mattina", fr: "Matin", es: "Mañana" },
  midday: { de: "Mittag", en: "Midday", it: "Mezzogiorno", fr: "Midi", es: "Mediodía" },
  afternoon: { de: "Nachmittag", en: "Afternoon", it: "Pomeriggio", fr: "Après-midi", es: "Tarde" },
  evening: { de: "Abend", en: "Evening", it: "Sera", fr: "Soir", es: "Noche" },
  orExactTime: {
    de: "Oder genaue Uhrzeit",
    en: "Or exact time",
    it: "Oppure ora esatta",
    fr: "Ou heure exacte",
    es: "O hora exacta",
  },
  overridesWindow: {
    de: "(überschreibt das Zeitfenster)",
    en: "(overrides the time slot)",
    it: "(sostituisce la fascia oraria)",
    fr: "(remplace le créneau)",
    es: "(reemplaza la franja horaria)",
  },
  sendRequest: {
    de: "Anfrage senden",
    en: "Send request",
    it: "Invia richiesta",
    fr: "Envoyer",
    es: "Enviar solicitud",
  },

  // Duration (Nicht stören)
  notDisturbQuestion: {
    de: "Wie lange möchten Sie nicht gestört werden?",
    en: "How long would you like to not be disturbed?",
    it: "Per quanto tempo non desiderate essere disturbati?",
    fr: "Pendant combien de temps souhaitez-vous ne pas être dérangé ?",
    es: "¿Durante cuánto tiempo desea no ser molestado?",
  },
  hour1: { de: "1 Stunde", en: "1 hour", it: "1 ora", fr: "1 heure", es: "1 hora" },
  hours2: { de: "2 Stunden", en: "2 hours", it: "2 ore", fr: "2 heures", es: "2 horas" },
  hours4: { de: "4 Stunden", en: "4 hours", it: "4 ore", fr: "4 heures", es: "4 horas" },
  tonight: {
    de: "Bis heute Abend",
    en: "Until tonight",
    it: "Fino a stasera",
    fr: "Jusqu'à ce soir",
    es: "Hasta esta noche",
  },
  tomorrow: {
    de: "Bis morgen früh",
    en: "Until tomorrow morning",
    it: "Fino a domani mattina",
    fr: "Jusqu'à demain matin",
    es: "Hasta mañana por la mañana",
  },
  orCustomTime: {
    de: "Oder bis zu einer bestimmten Uhrzeit",
    en: "Or until a specific time",
    it: "Oppure fino a un orario specifico",
    fr: "Ou jusqu'à une heure précise",
    es: "O hasta una hora específica",
  },
  until: { de: "bis", en: "until", it: "fino a", fr: "jusqu'à", es: "hasta" },
  ok: { de: "OK", en: "OK", it: "OK", fr: "OK", es: "OK" },

  // Catalog forms (Menu / Roomdrinks / Gift)
  selection: { de: "Auswahl", en: "Selection", it: "Selezione", fr: "Sélection", es: "Selección" },
  quantity: { de: "Anzahl", en: "Quantity", it: "Quantità", fr: "Quantité", es: "Cantidad" },
  time: { de: "Uhrzeit", en: "Time", it: "Ora", fr: "Heure", es: "Hora" },
  forWhom: {
    de: "Für wen?",
    en: "For whom?",
    it: "Per chi?",
    fr: "Pour qui ?",
    es: "¿Para quién?",
  },
  forWhomHint: {
    de: "(Name oder Zimmernummer, optional)",
    en: "(Name or room number, optional)",
    it: "(Nome o numero stanza, opzionale)",
    fr: "(Nom ou numéro de chambre, optionnel)",
    es: "(Nombre o número de habitación, opcional)",
  },
  optional: { de: "(optional)", en: "(optional)", it: "(opzionale)", fr: "(optionnel)", es: "(opcional)" },
  order: { de: "Bestellen", en: "Order", it: "Ordina", fr: "Commander", es: "Pedir" },

  // Breakfast
  breakfastBookTitle: {
    de: "Frühstück dazu buchen",
    en: "Add breakfast",
    it: "Aggiungi colazione",
    fr: "Ajouter le petit-déjeuner",
    es: "Añadir desayuno",
  },
  breakfastBookDesc: {
    de: "Falls noch nicht in Ihrer Buchung enthalten",
    en: "If not already in your booking",
    it: "Se non già inclusa nella vostra prenotazione",
    fr: "Si non inclus dans votre réservation",
    es: "Si no está incluido en su reserva",
  },
  drinkTitle: {
    de: "Getränk vorbestellen",
    en: "Pre-order drink",
    it: "Pre-ordina bevanda",
    fr: "Pré-commander une boisson",
    es: "Pre-ordenar bebida",
  },
  drinkDesc: {
    de: "Kaffee, Cappuccino, Tee — wartet auf Sie",
    en: "Coffee, cappuccino, tea — waiting for you",
    it: "Caffè, cappuccino, tè — vi aspetterà",
    fr: "Café, cappuccino, thé — vous attendra",
    es: "Café, capuchino, té — le esperará",
  },
  wishTitle: {
    de: "Besondere Wünsche",
    en: "Special wishes",
    it: "Desideri particolari",
    fr: "Souhaits particuliers",
    es: "Deseos especiales",
  },
  wishDesc: {
    de: "Allergien, glutenfrei, vegan, Vorlieben",
    en: "Allergies, gluten-free, vegan, preferences",
    it: "Allergie, senza glutine, vegano, preferenze",
    fr: "Allergies, sans gluten, végétalien, préférences",
    es: "Alergias, sin gluten, vegano, preferencias",
  },
};

// Service-Item-Labels — direkt vom deutschen DB-Label zur Übersetzung
const ITEM_LABELS: Record<string, Record<Lang, string>> = {
  Handtuchwechsel: {
    de: "Handtuchwechsel",
    en: "Towel change",
    it: "Cambio asciugamani",
    fr: "Changement de serviettes",
    es: "Cambio de toallas",
  },
  "Bettwäsche neu": {
    de: "Bettwäsche neu",
    en: "Fresh sheets",
    it: "Cambio biancheria",
    fr: "Linge propre",
    es: "Sábanas limpias",
  },
  "Nicht stören": {
    de: "Nicht stören",
    en: "Do not disturb",
    it: "Non disturbare",
    fr: "Ne pas déranger",
    es: "No molestar",
  },
  Frühstück: {
    de: "Frühstück",
    en: "Breakfast",
    it: "Colazione",
    fr: "Petit-déjeuner",
    es: "Desayuno",
  },
  "Speisen bestellen": {
    de: "Speisen bestellen",
    en: "Order food",
    it: "Ordinare cibo",
    fr: "Commander à manger",
    es: "Pedir comida",
  },
  "Getränke aufs Zimmer": {
    de: "Getränke aufs Zimmer",
    en: "Drinks to the room",
    it: "Bevande in camera",
    fr: "Boissons en chambre",
    es: "Bebidas a la habitación",
  },
  "Geste / Überraschung": {
    de: "Geste / Überraschung",
    en: "Gift / Surprise",
    it: "Regalo / Sorpresa",
    fr: "Cadeau / Surprise",
    es: "Regalo / Sorpresa",
  },
  "Sonstige Wünsche": {
    de: "Sonstige Wünsche",
    en: "Other requests",
    it: "Altre richieste",
    fr: "Autres demandes",
    es: "Otras peticiones",
  },
};

type DictKey = keyof typeof DICT;

export function t(key: DictKey, lang: Lang): string {
  return DICT[key]?.[lang] ?? DICT[key]?.de ?? key;
}

export function translateItemLabel(label: string, lang: Lang): string {
  return ITEM_LABELS[label]?.[lang] ?? label;
}

const COOKIE_NAME = "hgl-lang";

export async function getLang(): Promise<Lang> {
  const c = (await cookies()).get(COOKIE_NAME)?.value;
  if (c === "en" || c === "it" || c === "fr" || c === "es" || c === "de") return c;
  return "de";
}
