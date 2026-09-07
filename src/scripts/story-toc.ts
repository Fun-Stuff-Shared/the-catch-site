const links = [...document.querySelectorAll<HTMLAnchorElement>('.story-toc a[href^="#"]')];
const sections = links.map(link => ({link, section: document.getElementById(link.hash.slice(1))})).filter(row => row.section);
if (sections.length) {
  let scheduled = false;
  const update = () => {
    scheduled = false;
    let active = sections[0];
    for (const row of sections) {
      const rect = row.section!.getBoundingClientRect();
      if (rect.height && rect.top <= innerHeight * .22) active = row;
    }
    for (const row of sections) {
      row.link.parentElement?.classList.toggle('toc-active', row === active);
      row === active ? row.link.setAttribute('aria-current','location') : row.link.removeAttribute('aria-current');
    }
  };
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule);
  const main = document.querySelector('main');
  if (main) new ResizeObserver(schedule).observe(main);
  schedule();
}
