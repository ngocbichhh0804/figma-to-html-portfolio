# Glo. — Figma → HTML/CSS Portfolio

Chuyển UI kit mỹ phẩm "Glo." (Figma Community: Modern E-Commerce UI Kit) sang
HTML semantic + CSS thuần. Không framework, không bước build, **không một
dòng JavaScript nào được gửi xuống trình duyệt** trên trang đã hoàn thiện.

Chú thích trong code hiện đang viết tiếng Việt cho dễ đọc lúc phát triển —
sẽ chuyển sang tiếng Anh trước khi bàn giao.

## Quy ước bắt buộc — đọc trước khi sửa bất cứ gì

- **Không flexbox, không grid, không `gap`.** Toàn bộ bố cục dựng bằng kỹ
  thuật CSS trước thời flexbox: `float` + `calc()`, `clear`, `flow-root`,
  `inline-block` + `font-size: 0` ở cha, `line-height` + `vertical-align`,
  `position: absolute`. Xem README mục "Không flexbox, không grid" để biết
  chỗ nào dùng kỹ thuật nào.
- **Không JavaScript** trên trang giao cho khách. `dev/overlay.html` (công
  cụ so sánh nội bộ) là ngoại lệ — dùng radio input + `:has()`.
- **CSS chia theo cascade layer**, khai báo một lần trong `<head>` của
  `index.html`: `reset, tokens, base, layout, components, utilities`. Nhờ
  vậy không cần `!important` ở đâu (trừ khối `prefers-reduced-motion`).
- **`css/tokens.css` chỉ chứa giá trị dùng chung** (màu, font, thang độ
  đậm, leading, chuyển động, bo góc). Số đo riêng của một component ghi thẳng
  vào thuộc tính trong file component đó. Số dùng ở nhiều rule trong cùng
  component thì khai báo biến cục bộ trên selector gốc của component (vd.
  `.card { --card-title-gap: 87px; }`), không đưa lên `:root`. Mọi con số đều
  ghi nhãn nguồn gốc ngay bên cạnh:
  - `[FIGMA]` — đọc thẳng từ panel inspector
  - `[ĐO]` — đo bằng script quét pixel trên ảnh export 1:1
  - `[MẪU]` — lấy từ file asset được cung cấp
  - `[ƯỚC]` — ước lượng, chờ xác nhận lại
  Token chung sửa ở `tokens.css`; số đo riêng sửa tại chỗ trong component.
- Đặt tên BEM, specificity phẳng, không selector lồng quá một cấp, không
  dùng ID để style.
- Đổi cách dựng (nếu có) nhưng **không được đổi số đo đã chốt**: trang Shop
  phải giữ đúng cao 2748px và 19 mốc đo trong vài pixel so với Figma.

## Font

Bản thiết kế dùng 4 font thương mại (Roghiska, Butler, Gotham, Century
Gothic) — đã thay bằng 4 font OFL, tự lưu `.woff2` trong `assets/fonts/`
(không gọi Google Fonts ra ngoài):

| Vai trò | Font đang dùng | Weight đã nạp trong `css/fonts.css` |
| --- | --- | --- |
| Logo, tiêu đề hero | Cormorant Garamond | 400 |
| "GLO." chìm, ribbon, heading footer, giá | Fraunces (variable, opsz) | 100–900 |
| Tên sản phẩm, nút Subscribe | Montserrat | 400, 700 |
| Nav, filter, footer link, input, pagination | Mulish | 400, 500, 600, 700 |

Mulish 700 đã có (`mulish-latin-700-normal.woff2` + `@font-face` trong
`css/fonts.css`) — dùng cho "Product description", nav trang sản phẩm và
`.filter__title` ở trang Shop.

## Cấu trúc

```
index.html              trang Shop — đã xong, một file, không <script>
landing-page.html        landing page — đã xong, đối chiếu pixel với Figma
product.html             trang sản phẩm — đã xong, nền tối (body.theme-dark)
cart.html                trang giỏ hàng (Cart Page) — đã xong
checkout.html            trống — chưa dựng
css/
├── reset.css / fonts.css / tokens.css / base.css / layout.css
├── components/          nav, hero, filter, card, pagination, marquee, footer,
│                        showcase, discover, bestsellers, feature, button,
│                        breadcrumb, product, cart, basket (trang giỏ hàng)
│                        (form.css, table.css hiện đang trống)
└── utilities.css
assets/fonts/            10 file woff2, bảng mã latin
assets/icon/              icon PNG khách cung cấp (chỉ có 1x/36px — xem README)
assets/img/                ảnh sản phẩm; có vài file nháp cũ nên dọn khi rảnh
                         (image-removebg-preview*.png, Product listing page.png ~1.1MB)
dev/overlay.html         công cụ đè ảnh Figma lên bản code, đọc README trước khi dùng
dev/landing-overlay.html như trên cho landing page (1920 × 5769)
dev/product-overlay.html như trên cho trang sản phẩm (1920 × 1128)
dev/cart-overlay.html    như trên cho giỏ hàng (product.html#cart)
dev/cart-page-overlay.html như trên cho trang giỏ hàng (cart.html, 1920 × 1561)
docs/comparison/         ảnh đối chiếu Figma vs code (shop/, landing/, product/, cart/, cart-page/; checkout/ trống)
js/main.js, src/input.css  CÒN SÓT từ hướng làm cũ (Tailwind + JS), index.html
                         KHÔNG nạp hai file này. Cân nhắc xoá để khỏi gây hiểu nhầm
                         vì README cam kết "không JavaScript".
```

## Trạng thái hiện tại

- **Trang Shop (`index.html`)**: hoàn thiện, đã đối chiếu pixel với Figma
  (README có bảng số liệu chi tiết — sai lệch màu trung bình 10/765, 19 mốc
  đo lệch tối đa 5px). Lighthouse desktop 100/100/100/100, mobile
  93/100/100/100 (điểm performance mobile thiếu vì icon PNG chỉ có 1x).
  Responsive đã kiểm tới 320px.
- **Landing page (`landing-page.html`)**: hoàn thiện, khung 1920 × 5769.
  Header/footer dùng chung với Shop (footer có modifier `site-footer--landing`
  vì Figma landing đặt lệch vài px). Sai lệch màu trung bình 4.0/765, 9 ảnh
  khớp 0px, các vùng chữ/viền dò độ dịch về 0px. Chữ "GLO." dọc, chữ ribbon và huy hiệu là SVG dò từ
  ảnh export (`assets/img/glo-watermark-vertical.svg`). Ảnh Figma 1:1 ở
  `docs/comparison/landing/landing-figma.png`.
- **Trang sản phẩm (`product.html`)**: hoàn thiện, khung 1920 × 1128, nền tối.
  Theme tối là class `.theme-dark` trong `tokens.css` (chỉ đổi màu ngữ nghĩa).
  18 vùng chữ/icon/viền khớp 0px (vài mép 1px); nền + vầng sáng + "GLO." chìm
  lệch 1.6/765 sau khi làm mịn; sai lệch từng pixel 7.7/765, chủ yếu do lớp sạn
  giấy ngẫu nhiên (feTurbulence). Không có footer (Figma không vẽ). Fraunces
  không có "₹" → hình ₹ dò từ Figma, dùng làm mask data URI
  (`assets/img/rupee-sign.svg` là bản gốc).
- **Giỏ hàng (Cart Modal)**: ngăn kéo trong `product.html`, mở bằng `#cart`
  (`:target`, không JS). 16 vùng khớp 0px, sai lệch toàn khung 2.2/765. Mulish
  không có "₹" → ba mask PNG lấy alpha từ ảnh export (`assets/img/rupee-cart*.png`).
- **Trang giỏ hàng (`cart.html`)**: hoàn thiện, khung 1920 × 1561. 38 vùng
  khớp 0px, sai lệch toàn khung 2.7/765. Hai cột chỉ cạnh nhau từ 1440px.
  Icon túi đặc + chấm đỏ tách từ ảnh export (`assets/icon/icon-bag-filled.png`);
  ₹ là hai mask PNG (`assets/img/rupee-regular.png`, `rupee-bold.png`). Header
  dùng `site-header--bold` (chung với trang sản phẩm). "Go to Cart" ở ngăn kéo
  trỏ tới trang này.
- **`checkout.html`**: chưa dựng, cần ảnh export Figma 1:1.
- **Logo "Glo."** (chung ba trang): [FIGMA] 61.17px, giãn 2% — khớp hơn 63px cũ.
- **Header 1024–1439px**: đã thu khoảng hở link nav (trước đó "Offers" đè lên
  icon ở cả ba trang). Từ 1440px giữ đúng số Figma.
- **Ribbon "New arrivals"**: đang tĩnh, chưa chạy. Cần xác nhận với khách
  có chạy không và tốc độ — nếu chạy thì chỉ cần thêm `@keyframes`.
- **Đã sửa gần đây**: gộp `font-weight` trùng lặp và xoá dấu `;` thừa
  trong `.filter__title` (`css/components/filter.css`).

## Hai chỗ tự ý chỉnh khác thiết kế gốc (có ghi chú trong code)

Để đạt WCAG AA — xem `css/tokens.css`:
- `--text-idle`: Figma để `#A9967F` (tương phản 2.66:1) → đổi
  `rgb(88 54 13 / 72%)` = 4.62:1.
- `--border-control`: Figma để `#F4EBDF` (1.1:1) → đổi
  `rgb(88 54 13 / 56%)` = 3.07:1.

Muốn giữ đúng màu Figma thì sửa lại hai dòng này, nhưng điểm accessibility
sẽ rơi khỏi 100.

## Chạy thử

```bash
npm install     # chỉ để có browser-sync, trang không cần build
npm run dev     # http://localhost:3000, tự reload khi sửa file
```

Không có npm cũng chạy được: mở thẳng `index.html`, hoặc
`python3 -m http.server 3000`.

## Còn cần từ phía khách (theo README)

- Icon bản SVG hoặc @2x (bộ PNG hiện chỉ 36px, rỗ trên retina).
- Xác nhận ribbon có chạy không, tốc độ mong muốn.
- File Figma hai trang còn lại (Product description, Checkout).
