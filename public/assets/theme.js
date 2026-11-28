/* Follow the device before first paint and whenever its preference changes.
   Deliberately ignore old catch-theme overrides: there is no manual theme. */
(() => {
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    document.documentElement.dataset.theme = system.matches ? 'dark' : 'light';
  };
  apply();
  system.addEventListener('change', apply);
})();
