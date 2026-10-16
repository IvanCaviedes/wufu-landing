const RESEND_API_URL = "https://api.resend.com";

function resendHeaders() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

export async function sendConfirmationEmail(email: string, confirmationUrl: string) {
  const headers = resendHeaders();
  const from = process.env.RESEND_FROM_EMAIL;
  if (!headers || !from) return false;

  const response = await fetch(`${RESEND_API_URL}/emails`, {
    method: "POST",
    headers: {
      ...headers,
      "Idempotency-Key": `subscription-confirmation/${crypto.randomUUID()}`,
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Confirma tu correo para unirte a Rumi",
      text: `Confirma tu correo para recibir las novedades de Rumi. Este enlace vence en 30 minutos: ${confirmationUrl}`,
      html: `
        <div style="background:#f4ede1;padding:36px 18px;font-family:Arial,sans-serif;color:#07383f">
          <div style="max-width:560px;margin:auto;background:#fffaf1;border-radius:20px;padding:36px">
            <p style="margin:0 0 18px;color:#0b9588;font-weight:700">RUMI · MÁS VIDAS JUNTAS</p>
            <h1 style="font-size:30px;line-height:1.1;margin:0 0 18px">Confirma que este correo es tuyo</h1>
            <p style="font-size:16px;line-height:1.6;margin:0 0 26px">Solo falta un paso para recibir la fecha, ubicación y novedades de nuestra próxima tienda.</p>
            <a href="${confirmationUrl}" style="display:inline-block;background:#07383f;color:#fffaf1;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:700">Confirmar mi correo</a>
            <p style="font-size:13px;line-height:1.5;color:#5d7475;margin:26px 0 0">El enlace vence en 30 minutos. Si no solicitaste este registro, puedes ignorar el mensaje.</p>
          </div>
        </div>`,
    }),
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) console.error("Resend confirmation email failed", response.status);
  return response.ok;
}

export async function syncConfirmedContact(email: string, name: string) {
  const headers = resendHeaders();
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!headers || !audienceId) return false;

  const response = await fetch(`${RESEND_API_URL}/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, first_name: name, unsubscribed: false }),
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok && response.status !== 409) {
    console.error("Resend contact sync failed", response.status);
    return false;
  }

  return true;
}
