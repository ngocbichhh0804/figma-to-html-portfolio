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
| Nav, filter, footer link, input, pagination | Mulish | 400, 500, 600 |

**Việc còn dở:** `.filter__title` ("Filter") đã đặt `font-weight:
var(--weight-bold)` (700) nhưng Mulish 700 **chưa có file** trong
`assets/fonts/` và **chưa có khối `@font-face`** trong `css/fonts.css` —
trình duyệt hiện tại rơi về bản 600, chữ chưa đậm thật. Cần: tải
`mulish-latin-700-normal.woff2` (vd. gói `@fontsource/mulish`), bỏ vào
`assets/fonts/`, rồi thêm `@font-face` weight 700 vào `css/fonts.css` (chép
khối weight 600, đổi số).

## Cấu trúc

```
index.html              trang Shop — đã xong, một file, không <script>
product.html             trống — chưa dựng
checkout.html            trống — chưa dựng
css/
├── reset.css / fonts.css / tokens.css / base.css / layout.css
├── components/          nav, hero, filter, card, pagination, marquee, footer
│                        (button.css, form.css, table.css hiện đang trống)
└── utilities.css
assets/fonts/            9 file woff2, bảng mã latin
assets/icon/              icon PNG khách cung cấp (chỉ có 1x/36px — xem README)
assets/img/                ảnh sản phẩm; có vài file nháp cũ nên dọn khi rảnh
                         (image-removebg-preview*.png, Product listing page.png ~1.1MB)
dev/overlay.html         công cụ đè ảnh Figma lên bản code, đọc README trước khi dùng
docs/comparison/shop/    bộ ảnh đối chiếu Figma vs code (shop đã có; product/, checkout/ trống)
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
- **`product.html`, `checkout.html`**: chưa dựng. README nói cần export
  Figma 1:1 hai trang này từ khách — token đã dùng chung nên dựng tiếp
  được ngay khi có ảnh export.
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
