(function(){
  const content = document.querySelector('main');
  const toc = document.getElementById('toc');
  if (!content || !toc) return;

  const headings = [...content.querySelectorAll('h2, h3')].filter(h => h.id || h.textContent.trim());
  headings.forEach((h, idx) => {
    if (!h.id) {
      const slug = h.textContent.toLowerCase().replace(/[^\w\s-]/g,'').trim().replace(/\s+/g,'-');
      let id = slug || ('section-' + idx);
      // Ensure uniqueness
      let base = id, c = 1;
      while (document.getElementById(id)) { id = `${base}-${c++}`; }
      h.id = id;
    }
  });

  const items = headings.map(h => {
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    a.className = h.tagName === 'H2' ? 'h2' : 'h3';
    toc.appendChild(a);
    return { el: h, link: a };
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const item = items.find(i => i.el === entry.target);
      if (!item) return;
      if (entry.isIntersecting) {
        items.forEach(i => i.link.classList.remove('active'));
        item.link.classList.add('active');
      }
    });
  }, { rootMargin: '0px 0px -70% 0px', threshold: 0.001 });

  items.forEach(({el}) => observer.observe(el));
})();
