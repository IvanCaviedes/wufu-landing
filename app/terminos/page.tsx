import styles from "../legal.module.css";
const nav = [
  ["identidad", "Identidad"],
  ["aceptacion", "Aceptación"],
  ["campana", "Campaña"],
  ["dinamica", "Dinámica"],
  ["registro", "Registro"],
  ["propiedad", "Propiedad intelectual"],
  ["responsabilidad", "Responsabilidad"],
  ["consumidor", "Consumidor"],
  ["ley", "Ley aplicable"],
];
export default function Terminos() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Reglas claras</span>
          <h1>Términos y condiciones.</h1>
          <p className={styles.lead}>
            Condiciones para el acceso a la landing, el registro al lanzamiento y la experiencia
            interactiva de Wufú.
          </p>
        </div>
        <aside className={styles.meta}>
          <span>Versión</span>
          <strong>1.0</strong>
          <span>Actualización</span>
          <strong>14 de octubre de 2026</strong>
          <span>Ámbito</span>
          <strong>Colombia</strong>
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
            Estos términos cubren una campaña de expectativa, no una tienda activa. Al habilitar
            ventas deben añadirse precios, pagos, entrega, retracto, reversión y garantía.
          </div>
          <div className={styles.required}>
            <strong>Información obligatoria pendiente</strong>
            <p>
              Razón social, NIT, dirección judicial, teléfono, correo, fechas, territorio,
              elegibilidad, descripción y cantidad de beneficios.
            </p>
          </div>
          <section id="identidad" className={styles.section}>
            <h2>1. Identificación</h2>
            <p>
              El sitio es operado por <strong>[RAZÓN SOCIAL]</strong>, NIT <strong>[NIT]</strong>,
              domicilio <strong>[DIRECCIÓN, CIUDAD]</strong>, teléfono <strong>[TELÉFONO]</strong> y
              correo <strong>[CORREO]</strong>, en adelante “Wufú”.
            </p>
          </section>
          <section id="aceptacion" className={styles.section}>
            <h2>2. Aceptación y capacidad</h2>
            <p>
              Al usar el sitio aceptas estos términos y la Política de Privacidad. Si no estás de
              acuerdo, abstente de usar el registro. Declaras tener capacidad legal; los menores
              actuarán mediante representante cuando corresponda.
            </p>
          </section>
          <section id="campana" className={styles.section}>
            <h2>3. Naturaleza de la campaña</h2>
            <p>
              La landing anuncia un próximo lanzamiento. Su contenido es informativo y no constituye
              oferta de venta mientras no se indiquen producto, precio, disponibilidad y condiciones
              esenciales. Wufú puede actualizar contenido sin afectar derechos adquiridos.
            </p>
          </section>
          <section id="dinamica" className={styles.section}>
            <h2>4. Hallazgos y beneficio</h2>
            <p>
              El sitio contiene cinco hallazgos digitales. El progreso se conserva localmente y
              completar la colección puede habilitar elegibilidad en el formulario; no garantiza por
              sí solo la entrega de un beneficio.
            </p>
            <h3>Antes de activar el beneficio se publicará</h3>
            <ul>
              <li>Vigencia y territorio exactos.</li>
              <li>Número, naturaleza y valor de los beneficios.</li>
              <li>Edad y requisitos de participación.</li>
              <li>Mecanismo de validación, asignación, notificación y entrega.</li>
              <li>Causales de exclusión, empates y disponibilidad.</li>
            </ul>
            <p>
              No se exige pago para participar. Podrá invalidarse progreso automatizado, fraudulento
              o manipulado. Las condiciones definitivas obligarán a Wufú desde su publicación.
            </p>
          </section>
          <section id="registro" className={styles.section}>
            <h2>5. Registro y comunicaciones</h2>
            <p>
              Debes proporcionar datos veraces, actualizados y propios. Registrarte no crea una
              compra. Las comunicaciones publicitarias requieren autorización expresa y podrán
              cancelarse en cada mensaje o escribiendo a <strong>[CORREO]</strong>.
            </p>
          </section>
          <section id="propiedad" className={styles.section}>
            <h2>6. Propiedad intelectual y usos prohibidos</h2>
            <p>
              Marcas, textos, fotografías, interfaces y código pertenecen a Wufú o se usan con
              autorización. Solo se permite uso personal y no comercial. Se prohíbe copiar, vender,
              alterar, extraer datos automáticamente, interferir con la seguridad, suplantar
              usuarios o manipular la dinámica.
            </p>
          </section>
          <section id="responsabilidad" className={styles.section}>
            <h2>7. Disponibilidad y responsabilidad</h2>
            <p>
              Wufú procura disponibilidad y seguridad, pero no garantiza operación ininterrumpida.
              Puede suspender el sitio por mantenimiento, seguridad o fuerza mayor. Nada excluye
              responsabilidades legalmente inderogables ni derechos irrenunciables del consumidor.
              Los sitios de terceros son responsabilidad de sus operadores.
            </p>
          </section>
          <section id="consumidor" className={styles.section}>
            <h2>8. Protección al consumidor</h2>
            <p>
              Cuando exista comercio electrónico, Wufú informará identidad, características,
              disponibilidad, precio total, impuestos, entrega, retracto, reversión, garantías y
              reclamaciones conforme a la Ley 1480 de 2011. El consumidor puede acudir a la{" "}
              <a href="https://www.sic.gov.co/" target="_blank" rel="noreferrer">
                Superintendencia de Industria y Comercio
              </a>
              .
            </p>
          </section>
          <section id="ley" className={styles.section}>
            <h2>9. Cambios, ley aplicable y contacto</h2>
            <p>
              Rige la ley colombiana. Los cambios materiales se publicarán con su vigencia y no
              operarán retroactivamente en perjuicio del usuario. Puedes contactarnos en{" "}
              <strong>[CORREO]</strong> sin limitar tu derecho a acudir a autoridades.
            </p>
            <h3>Fuentes oficiales</h3>
            <p>
              <a
                href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=44306"
                target="_blank"
                rel="noreferrer"
              >
                Ley 1480 de 2011
              </a>{" "}
              ·{" "}
              <a
                href="https://www1.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=213990"
                target="_blank"
                rel="noreferrer"
              >
                Ley 2300 de 2023
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
