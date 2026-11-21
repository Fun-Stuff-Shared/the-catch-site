/* Blocking, first-party head script: resolve the theme before first paint. */
(() => {
  const key = 'catch-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => value === 'light' || value === 'dark' ? value : 'system';
  const preferences = ['system', 'light', 'dark'];
  const labels = { system: 'Auto', light: 'Light', dark: 'Dark' };
  let preference = 'system';
  try { preference = valid(localStorage.getItem(key)); } catch { /* Storage is optional. */ }

  const apply = () => {
    document.documentElement.dataset.theme = preference === 'system' ? system.matches ? 'dark' : 'light' : preference;
    const control = document.getElementById('color-theme');
    if (control) {
      control.value = preference;
      const next = preferences[(preferences.indexOf(preference) + 1) % preferences.length];
      const label = `${labels[preference]}${preference === 'system' ? ' (follows your device)' : ''}. Switch to ${labels[next]}.`;
      control.setAttribute('aria-label', `Color theme: ${label}`);
      control.title = label;
      control.querySelector('[data-theme-label]').textContent = labels[preference];
    }
  };
  apply();
  system.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue);
      apply();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const control = document.getElementById('color-theme');
    if (!control) return;
    apply();
    control.addEventListener('click', () => {
      preference = preferences[(preferences.indexOf(preference) + 1) % preferences.length];
      try {
        if (preference === 'system') localStorage.removeItem(key);
        else localStorage.setItem(key, preference);
      } catch { /* Keep the choice for this page even if storage is blocked. */ }
      apply();
    });
    control.closest('.theme-control').hidden = false;
  }, { once: true });
})();
