/**
 * Glo. — trang Shop.
 * Ba việc nhỏ, không dùng framework nào:
 *   1. ngăn kéo menu mobile (giữ focus bên trong, Esc để đóng)
 *   2. các dòng rating trong cột filter, sinh từ dữ liệu để markup ngôi sao
 *      chỉ phải viết một lần thay vì mười lăm lần
 *   3. nhân đôi dải ribbon để vòng lặp không lộ mối nối
 */
(() => {
  "use strict";

  /* --------------------------------------------------------- thanh nav -- */
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  const desktop = window.matchMedia("(min-width: 64em)");

  if (toggle && panel) {
    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
    const focusablesIn = (root) =>
      Array.from(root.querySelectorAll('a[href], button:not([disabled])')).filter(
        (el) => el.offsetParent !== null
      );

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
    };

    toggle.addEventListener("click", () => {
      const next = !isOpen();
      setOpen(next);
      if (next) focusablesIn(panel)[0]?.focus();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    panel.addEventListener("keydown", (event) => {
      if (event.key !== "Tab" || !isOpen() || desktop.matches) return;
      const items = focusablesIn(panel);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const syncToViewport = () => {
      if (desktop.matches) {
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "false");
      } else if (!isOpen()) {
        panel.hidden = true;
      }
    };

    desktop.addEventListener("change", syncToViewport);
    syncToViewport();
  }

  /* ------------------------------------------------------------- rating -- */
  const ratingList = document.querySelector("[data-rating]");

  if (ratingList) {
    const TOTAL = 5;
    const rows = [5, 4, 3, 2, 1]
      .map((score) => {
        const stars = Array.from({ length: TOTAL }, (_, i) => {
          const filled = i < score;
          const src = filled ? "assets/icon/icon-star-fill.png" : "assets/icon/icon-star-outline.png";
          return `<img src="${src}" alt="" width="11" height="11" loading="lazy" />`;
        }).join("");

        return `
          <li>
            <label class="rating__row">
              <input class="visually-hidden" type="radio" name="rating" value="${score}" />
              <span class="rating__stars" aria-hidden="true">${stars}</span>
              <span class="rating__label">${score} star</span>
            </label>
          </li>`;
      })
      .join("");

    ratingList.innerHTML = rows;
  }

  /* ------------------------------------------------------------ ribbon -- */
  const track = document.querySelector("[data-marquee]");

  if (track) {
    const LABELS = ["New Arrivals", "New arrivals", "New arrivals", "New arrivals"];
    const star = '<img class="marquee__star" src="assets/icon/icon-sparkle.png" alt="" width="26" height="26" loading="lazy" />';
    const sequence = LABELS.map((label) => `<span class="marquee__item">${label}${star}</span>`).join("");

    // Vẽ hai lần để khi dịch dải đi −50% thì rơi đúng vào một khung giống hệt.
    track.innerHTML = sequence + sequence;
  }
})();
