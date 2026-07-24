// Renders the homepage gallery as a masonry grid (columns of stacked photos,
// alternating vertical offset) where the WHOLE grid scrolls together as one
// continuous block — the grid is duplicated once for a seamless loop, same
// mechanic as the menu slider (js/render-menu.js) but moving as a unit rather
// than tile-by-tile. Source: window.GALLERY_DATA.

(function () {
  const track = document.getElementById("galleryTrack");
  if (!track) return;
  const DATA = window.GALLERY_DATA || [];
  if (!DATA.length) return;

  function esc(str) {
    return String(str || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
  function ml(o) {
    return ["en", "jp", "ko", "zh"].map((k) => `<span class="lang-${k}">${esc(o[k])}</span>`).join("");
  }

  function tileHtml(item, hidden) {
    return `
      <figure class="gallery-tile"${hidden ? ' aria-hidden="true"' : ""}>
        <img src="${esc(item.src)}" alt="${hidden ? "" : esc(item.alt)}" onerror="this.style.display='none'">
        <figcaption class="g-caption">${ml(item.cap)}</figcaption>
      </figure>`;
  }

  // Group photos into columns of 2 (stacked), alternating columns offset
  // downward via CSS — mirrors the original static masonry layout.
  function gridBlockHtml(hidden) {
    const cols = [];
    for (let i = 0; i < DATA.length; i += 2) {
      const pair = DATA.slice(i, i + 2);
      cols.push(`<div class="g-col">${pair.map((item) => tileHtml(item, hidden)).join("")}</div>`);
    }
    return `<div class="gallery-grid-block"${hidden ? ' aria-hidden="true"' : ""}>${cols.join("")}</div>`;
  }

  track.innerHTML = gridBlockHtml(false) + gridBlockHtml(true);
  // Duration scales with the number of columns so the pace feels consistent
  // regardless of how many photos are in the gallery.
  const colCount = Math.ceil(DATA.length / 2);
  track.style.animationDuration = `${Math.max(50, colCount * 9)}s`;
})();
