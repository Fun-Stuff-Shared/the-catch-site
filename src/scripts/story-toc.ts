const nav = document.querySelector<HTMLElement>('.story-toc');
const disclosure = nav?.querySelector<HTMLDetailsElement>('details');
const sections = [...(nav?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]') ?? [])]
  .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
  .filter(row => row.section);
if (nav && disclosure && sections.length) {
  const wide = matchMedia('(min-width: 1440px)');
  const adapt = () => { disclosure.open = wide.matches; };
  adapt();
  wide.addEventListener('change', adapt);
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const visible = sections.filter(row => row.section!.getBoundingClientRect().height > 0);
    let active = visible[0];
    for (const row of visible) {
      if (row.section!.getBoundingClientRect().top <= Math.max(120, innerHeight * .22)) active = row;
    }
    for (const row of sections) {
      row.link.parentElement!.hidden = !visible.includes(row);
      row.link.parentElement?.classList.toggle('toc-active', row === active);
      row === active ? row.link.setAttribute('aria-current', 'location') : row.link.removeAttribute('aria-current');
    }
    const label = nav.querySelector('.toc-current');
    if (label) label.textContent = active?.link.textContent ?? '';
  };
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
  sections.forEach(({link, section}) => link.addEventListener('click', () => {
    if (!wide.matches) disclosure.open = false;
    section!.tabIndex = -1;
    section!.focus({ preventScroll: true });
  }));
  document.addEventListener('reading-mode-change', schedule);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  const main = document.querySelector('main');
  if (main) new ResizeObserver(schedule).observe(main);
  schedule();
}
