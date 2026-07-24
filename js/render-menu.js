// Renders the homepage sliding tiles and the full menu page from window.MENU_DATA
// (defined in js/menu-data.js). Names & descriptions follow the selected language
// (en / jp / ko / zh) — the menu page shows the item name in the active language
// only, not English by default.

(function () {
  const DATA = window.MENU_DATA || [];

  const CATEGORIES = [
    { key: "Signature", id: "signature",
      en: "Signature", jp: "看板メニュー", ko: "대표 메뉴", zh: "招牌", zen: "看板",
      tagEn: "Signature", tagJp: "看板", tagKo: "대표", tagZh: "招牌" },
    { key: "Ramen", id: "ramen",
      en: "Ramen", jp: "らぁ麺", ko: "라멘", zh: "拉面", zen: "らぁ麺",
      tagEn: "Ramen", tagJp: "らぁ麺", tagKo: "라멘", tagZh: "拉面" },
    { key: "Tsukemen & Mazesoba", id: "tsukemen",
      en: "Tsukemen & Mazesoba", jp: "つけ麺・まぜそば", ko: "츠케멘 · 마제소바", zh: "蘸面 · 拌面", zen: "つけ麺",
      tagEn: "Tsukemen", tagJp: "つけ麺", tagKo: "츠케멘", tagZh: "蘸面" },
    { key: "Toppings", id: "toppings",
      en: "Toppings", jp: "トッピング", ko: "토핑", zh: "配料", zen: "追加",
      tagEn: "Topping", tagJp: "追加", tagKo: "토핑", tagZh: "配料" },
    { key: "Rice & Sides", id: "rice",
      en: "Rice & Sides", jp: "ご飯・一品", ko: "밥 · 사이드", zh: "米饭 · 小食", zen: "ご飯",
      tagEn: "Rice", tagJp: "ご飯", tagKo: "밥", tagZh: "米饭" },
    { key: "Drinks", id: "drinks",
      en: "Drinks", jp: "お飲み物", ko: "음료", zh: "饮品", zen: "飲物",
      tagEn: "Drink", tagJp: "飲物", tagKo: "음료", tagZh: "饮品" },
  ];

  function esc(str) {
    return String(str || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  // Build the four language spans; only the active one is shown via CSS.
  function ml(o, extra) {
    const x = extra ? " " + extra : "";
    return (
      `<span class="lang-en${x}">${esc(o.en)}</span>` +
      `<span class="lang-jp${x}">${esc(o.jp)}</span>` +
      `<span class="lang-ko${x}">${esc(o.ko)}</span>` +
      `<span class="lang-zh${x}">${esc(o.zh)}</span>`
    );
  }
  const nameOf = (i) => ({ en: i.nameEn, jp: i.nameJp, ko: i.nameKo, zh: i.nameZh });
  const descOf = (i) => ({ en: i.descEn, jp: i.descJp, ko: i.descKo, zh: i.descZh });

  function priceStr(n) {
    return "¥" + Number(n || 0).toLocaleString("en-US");
  }

  function badgeHtml(item) {
    if (!item.badge) return "";
    const cls = /new|新|신/i.test(item.badge.en + item.badge.ko) ? "menu-badge new" : "menu-badge";
    return `<span class="${cls}">${ml(item.badge)}</span>`;
  }

  function tileHtml(item, cat, hidden) {
    return `
      <a class="menu-tile" href="menu.html#${cat.id}"${hidden ? ' aria-hidden="true"' : ""}>
        <div class="menu-tile-img">
          <span class="menu-tile-cat">${ml({ en: cat.tagEn, jp: cat.tagJp, ko: cat.tagKo, zh: cat.tagZh })}</span>
          <img src="${esc(item.image)}" alt="${hidden ? "" : esc(item.nameEn)}" onerror="this.style.display='none'">
        </div>
        <div class="menu-tile-body">
          <span class="tile-name">${ml(nameOf(item))}</span>
          <span class="price">${priceStr(item.price)}</span>
        </div>
      </a>`;
  }

  function itemHtml(item) {
    return `
      <div class="menu-item">
        <div class="menu-item-img"><img src="${esc(item.image)}" alt="${esc(item.nameEn)}" onerror="this.style.display='none'"></div>
        <div class="menu-item-info">
          <div class="menu-item-top">
            <span class="item-name">${ml(nameOf(item))}${badgeHtml(item)}</span>
            <span class="dotfill"></span>
            <span class="price">${priceStr(item.price)}</span>
          </div>
          <p class="desc">${ml(descOf(item))}</p>
        </div>
      </div>`;
  }

  function renderHomepageSlider() {
    const track = document.getElementById("sliderTrack");
    if (!track) return;

    const featured = DATA.filter((i) => i.active && i.featured);
    if (!featured.length) return;

    const byCat = (item) => CATEGORIES.find((c) => c.key === item.category) || CATEGORIES[0];
    const tiles = featured.map((item) => tileHtml(item, byCat(item), false));
    const tilesDup = featured.map((item) => tileHtml(item, byCat(item), true));
    track.innerHTML = tiles.join("") + tilesDup.join("");
    track.style.animationDuration = `${Math.max(28, featured.length * 6)}s`;
  }

  function renderMenuPage() {
    const nav = document.getElementById("categoryNav");
    const sections = document.getElementById("menuSections");
    if (!nav || !sections) return;

    const navLinks = [];
    const sectionBlocks = [];

    CATEGORIES.forEach((cat) => {
      const items = DATA.filter((i) => i.active && i.category === cat.key);
      if (!items.length) return;

      navLinks.push(`<li><a href="#${cat.id}">${ml(cat)}</a></li>`);

      sectionBlocks.push(`
        <section class="menu-section" id="${cat.id}">
          <div class="container">
            <div class="menu-section-title">
              <h2>${ml(cat)}</h2>
              <span class="rule"></span>
              <span class="zen">${esc(cat.zen)}</span>
            </div>
            <div class="menu-list">
              ${items.map(itemHtml).join("")}
            </div>
          </div>
        </section>`);
    });

    nav.innerHTML = navLinks.join("");
    sections.innerHTML = sectionBlocks.join("");
  }

  renderHomepageSlider();
  renderMenuPage();
})();
