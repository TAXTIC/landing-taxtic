export default function RootNotFound() {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#1a1a1a",
        }}
      >
        <main
          style={{
            padding: "4rem 1rem",
            textAlign: "center",
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Página no encontrada
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.5,
              marginBottom: "2rem",
            }}
          >
            El link que seguiste no existe en este sitio.
          </p>
          <p>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/es"
              style={{ color: "#d57a23", textDecoration: "underline" }}
            >
              Volver al inicio
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
