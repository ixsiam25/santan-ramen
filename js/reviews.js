// Reviews section for らぁ麺 三湯 SANTAN.
// ---------------------------------------------------------------------------
// The cards below are REAL excerpts quoted (and translated) from the shop's
// Tabelog page (tabelog.com/.../44012525, aggregate 3.40★). A static site can't
// fetch reviews live, so they are seeded here — edit this array to update them.
//
// TO PULL LIVE: use the Google Places API (needs an API key + billing) or a
// small backend that scrapes Tabelog, then map results into the same shape and
// call renderReviews(data). Example Google shape:
//   fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=PLACE_ID&fields=reviews&key=API_KEY`)
//     .then(r => r.json()).then(d => renderReviews(d.result.reviews.map(mapGoogle)));
// (The key must live on a server/proxy — never commit it into this file.)
// ---------------------------------------------------------------------------

window.SANTAN_REVIEWS = [
  { stars: 5, src: "Tabelog",
    text: { en: "As refined as French cuisine — the rich “Yukihime” was unforgettable.",
            jp: "フレンチのように洗練された一杯。濃厚な「雪姫」が忘れられません。",
            ko: "프렌치처럼 세련된 한 그릇. 진한 ‘유키히메’가 잊히지 않아요.",
            zh: "宛如法式料理般精致，浓郁的「雪姬」令人难忘。" } },
  { stars: 4, src: "Tabelog",
    text: { en: "A cappuccino-like foam paitan — so good I ordered a kaedama.",
            jp: "カプチーノのような泡パイタン。美味しくて替え玉までしました。",
            ko: "카푸치노 같은 거품 파이탄. 맛있어서 사리 추가까지 했어요.",
            zh: "如卡布奇诺般的泡沫白汤，好吃到加了面。" } },
  { stars: 5, src: "Tabelog",
    text: { en: "Pure-white, fine espuma foam — an elegant, potage-like sweetness.",
            jp: "真っ白できめ細かいエスプーマの泡。ポタージュのような上品な甘み。",
            ko: "새하얗고 고운 에스푸마 거품. 포타주처럼 우아한 단맛.",
            zh: "洁白细腻的意式泡沫，如浓汤般优雅的甘甜。" } },
  { stars: 4, src: "Tabelog",
    text: { en: "A creamy bowl unlike any usual ramen — and a very stylish space.",
            jp: "普段のラーメンとは違うクリーミーな一杯。店内もとてもオシャレ。",
            ko: "여느 라멘과는 다른 크리미한 한 그릇. 매장도 무척 세련됐어요.",
            zh: "与寻常拉面不同的奶香一碗，店内也十分时尚。" } },
  { stars: 4, src: "Tabelog",
    text: { en: "The first bite of our Beppu trip — a calm, counter-focused space.",
            jp: "別府旅行の食べ初めに。カウンター中心の落ち着いた空間でした。",
            ko: "벳푸 여행의 첫 식사로. 카운터 중심의 차분한 공간이었어요.",
            zh: "别府旅行的第一餐。以吧台为主、氛围沉静的空间。" } },
  { stars: 5, src: "Tabelog",
    text: { en: "The foam soup is astonishingly smooth — and striking to look at.",
            jp: "泡系スープは口当たりが驚くほど滑らか。目を引く美しさ。",
            ko: "거품 스프는 놀랄 만큼 부드럽고, 시선을 끄는 아름다움.",
            zh: "泡沫汤头口感顺滑得惊人，卖相亦十分吸睛。" } },
];

// Localized generic attribution (these are Tabelog visitor reviews).
const REVIEW_AUTHOR = { en: "Tabelog diner", jp: "食べログ利用者", ko: "타베로그 이용자", zh: "食べログ用户" };

(function () {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
  function ml(o) {
    return ["en", "jp", "ko", "zh"].map((k) => `<span class="lang-${k}">${esc(o[k])}</span>`).join("");
  }
  function stars(n) {
    n = Math.max(0, Math.min(5, n | 0));
    return "★".repeat(n) + "<span style='opacity:.28'>" + "★".repeat(5 - n) + "</span>";
  }

  window.renderReviews = function (list) {
    grid.innerHTML = list.map((r) => `
      <article class="review-card">
        <div class="r-stars" aria-label="${r.stars} out of 5">${stars(r.stars)}</div>
        <p class="r-text">${ml(r.text)}</p>
        <div class="r-foot">
          <span class="r-author">${ml(REVIEW_AUTHOR)}</span>
          <span class="r-src">${esc(r.src)}</span>
        </div>
      </article>`).join("");
  };

  window.renderReviews(window.SANTAN_REVIEWS);
})();
