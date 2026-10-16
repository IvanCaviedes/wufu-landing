const initializeTheme = `
  (() => {
    try {
      const savedTheme = localStorage.getItem("rumi-theme");
      const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.dataset.theme = savedTheme ?? (prefersDark ? "dark" : "light");
    } catch {
      document.documentElement.dataset.theme = matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  })();
`;

export default function ThemeScript() {
  return <script id="theme-initializer" dangerouslySetInnerHTML={{ __html: initializeTheme }} />;
}
