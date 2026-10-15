import styles from "../legal.module.css";
import { legalConfig } from "../config/legal";
const nav = [
  ["responsable", "Responsable"],
  ["datos", "Datos tratados"],
  ["finalidades", "Finalidades"],
  ["derechos", "Derechos"],
  ["solicitudes", "Solicitudes"],
  ["seguridad", "Seguridad"],
  ["cookies", "Cookies"],
  ["vigencia", "Vigencia"],
];
export default function Privacidad() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Transparencia y confianza</span>
          <h1>Política de privacidad.</h1>
          <p className={styles.lead}>
            Qué información recopilamos, para qué la utilizamos y cómo puedes ejercer control sobre
            tus datos personales.
          </p>
        </div>
        <aside className={styles.meta}>
          <span>Versión</span>
          <strong>{legalConfig.version}</strong>
          <span>Actualización</span>
          <strong>{legalConfig.lastUpdated}</strong>
          <span>Jurisdicción</span>
          <strong>{legalConfig.country}</strong>
        </aside>
      </section>
      <div className={styles.layout}>
        <nav className={styles.toc}>
          <strong>Contenido</strong>
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <article className={styles.content}>
          <div className={styles.notice}>
            Documento preparado conforme a la Ley 1581 de 2012 y normas reglamentarias. Los datos
            empresariales marcados deben completarse antes de publicar.
          </div>
          <div className={styles.required}>
            <strong>Información del responsable</strong>
            <p>
              Razón social: {legalConfig.companyName} · NIT: {legalConfig.nit} · Domicilio:{" "}
              {legalConfig.address}, {legalConfig.city} · Correo de privacidad:{" "}
              {legalConfig.privacyEmail} · Teléfono: {legalConfig.phone}.
            </p>
          </div>
          <section id="responsable" className={styles.section}>
            <h2>1. Responsable del tratamiento</h2>
            <p>
              <strong>{legalConfig.companyName}</strong>, NIT <strong>{legalConfig.nit}</strong>,
              domiciliada en{" "}
              <strong>
                {legalConfig.city}, {legalConfig.country}
              </strong>
              , es responsable del tratamiento de los datos recopilados por Wufú. Canal de
              privacidad: <strong>{legalConfig.privacyEmail}</strong>.
            </p>
          </section>
          <section id="datos" className={styles.section}>
            <h2>2. Datos tratados</h2>
            <ul>
              <li>Nombre, correo electrónico y datos de contacto.</li>
              <li>Información general sobre la mascota seleccionada.</li>
              <li>IP, navegador, dispositivo, fecha, hora y registros de seguridad.</li>
              <li>Consentimientos, preferencias visuales y progreso interactivo.</li>
            </ul>
            <p>No solicitamos datos sensibles, financieros ni de salud.</p>
          </section>
          <section id="finalidades" className={styles.section}>
            <h2>3. Finalidades y autorización</h2>
            <p>
              Usamos los datos para gestionar el registro, enviar información solicitada,
              administrar beneficios de campaña, responder consultas, prevenir abuso, medir el
              funcionamiento y cumplir obligaciones legales. La publicidad es una finalidad opcional
              y requiere autorización previa, expresa e informada, cuya evidencia será conservada.
            </p>
          </section>
          <section id="derechos" className={styles.section}>
            <h2>4. Derechos del titular</h2>
            <p>
              Puedes conocer, actualizar, rectificar y acceder gratuitamente a tus datos; solicitar
              prueba de la autorización y conocer el uso dado; revocar la autorización o solicitar
              supresión cuando proceda; y presentar quejas ante la Superintendencia de Industria y
              Comercio.
            </p>
          </section>
          <section id="solicitudes" className={styles.section}>
            <h2>5. Consultas, reclamos y supresión</h2>
            <p>
              Envía la solicitud a <strong>{legalConfig.privacyEmail}</strong> con tu
              identificación, descripción, contacto y soportes. Las consultas se atenderán en diez
              (10) días hábiles, prorrogables por cinco (5); los reclamos en quince (15),
              prorrogables por ocho (8), con aviso y justificación. La supresión no procede si
              existe deber legal o contractual de conservación.
            </p>
            <p>Los mensajes comerciales incluirán un mecanismo sencillo de cancelación.</p>
          </section>
          <section id="seguridad" className={styles.section}>
            <h2>6. Seguridad, proveedores y transferencias</h2>
            <p>
              Aplicamos medidas razonables administrativas, técnicas y organizacionales. Podemos
              utilizar proveedores de alojamiento, correo, analítica y soporte como encargados
              sujetos a confidencialidad. Toda transmisión o transferencia internacional cumplirá la
              legislación colombiana. Ningún sistema es absolutamente seguro.
            </p>
          </section>
          <section id="cookies" className={styles.section}>
            <h2>7. Cookies, LocalStorage y menores</h2>
            <p>
              Usamos almacenamiento local para recordar el tema y conservar cifrado el progreso
              interactivo. Las tecnologías no esenciales requerirán el consentimiento aplicable. La
              campaña no está dirigida deliberadamente a menores; sus datos solo se tratarán con
              autorización del representante y respetando su interés superior.
            </p>
          </section>
          <section id="vigencia" className={styles.section}>
            <h2>8. Conservación, cambios y vigencia</h2>
            <p>
              Conservaremos los datos mientras sean necesarios para las finalidades y obligaciones
              legales, y después los eliminaremos o anonimizaremos. Los cambios sustanciales serán
              informados y, si corresponde, requerirán nueva autorización.
            </p>
            <h3>Fuentes oficiales</h3>
            <p>
              <a
                href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981"
                target="_blank"
                rel="noreferrer"
              >
                Ley 1581 de 2012
              </a>{" "}
              ·{" "}
              <a
                href="https://www.sic.gov.co/tema/proteccion-de-datos-personales"
                target="_blank"
                rel="noreferrer"
              >
                SIC — Protección de datos
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
