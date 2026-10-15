const value = (name: string, fallback: string) => process.env[name]?.trim() || fallback;

export const legalConfig = {
  companyName: value("LEGAL_COMPANY_NAME", "Wufú [RAZÓN SOCIAL PENDIENTE]"),
  nit: value("LEGAL_NIT", "[NIT PENDIENTE]"),
  address: value("LEGAL_ADDRESS", "[DIRECCIÓN PENDIENTE]"),
  city: value("LEGAL_CITY", "[CIUDAD PENDIENTE]"),
  country: value("LEGAL_COUNTRY", "Colombia"),
  privacyEmail: value("LEGAL_PRIVACY_EMAIL", "[CORREO PENDIENTE]"),
  contactEmail: value("LEGAL_CONTACT_EMAIL", "[CORREO PENDIENTE]"),
  phone: value("LEGAL_PHONE", "[TELÉFONO PENDIENTE]"),
  version: value("LEGAL_VERSION", "1.0"),
  lastUpdated: value("LEGAL_LAST_UPDATED", "15 de octubre de 2026"),
} as const;
