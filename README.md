# Figma → HTML/CSS — trang Shop của Glo.

Trang Shop trong bộ UI kit mỹ phẩm Glo., cắt tay từ Figma sang HTML semantic và
**CSS thuần**. Không framework, không bước build, và **không một dòng JavaScript
nào được gửi xuống trình duyệt**.

> Chú thích trong code đang để tiếng Việt cho dễ đọc trong lúc phát triển.
> Sẽ chuyển sang tiếng Anh trước khi bàn giao.

**Live:** _điền URL_ · **Source:** _điền URL_ · **Thiết kế:** Modern E-Commerce UI Kit (Figma Community)

---

## Độ khớp với bản thiết kế

Khung gốc trong Figma là **1920 × 2748**. Bản dựng render ra đúng **1920 × 2748**
— không lệch pixel nào về tổng chiều cao.

| Cách kiểm | Kết quả |
| --- | --- |
| Sai lệch màu trung bình trên toàn trang | **10.0 / 765** (tổng 3 kênh RGB) |
| Tỉ lệ pixel lệch ≤ 30 / 765 | **96.7 %** |
| Tỉ lệ pixel lệch ≤ 60 / 765 | **97.5 %** |
| 19 mốc đo (logo, nav, hero, ảnh, tiêu đề, giá, ribbon, footer…) | lệch tối đa **5 px** |
| Logo, icon header, hero, ảnh sản phẩm, tên/giá sản phẩm, pagination, sao ribbon, heading footer | **0–1 px** |

Phần lệch còn lại gần như chỉ nằm ở nét chữ — cùng một font nhưng Figma và
Chromium dựng chữ theo hai engine khác nhau. Bố cục, khoảng cách và màu thì
trùng.

Hai chỗ trong bản thiết kế không tái tạo được bằng CSS mà cũng không nên tái
tạo: chữ "Our Story" ở cột *About* trong Figma bị ngắt thành hai dòng do hộp
chữ được kéo hẹp bằng tay, và giá sản phẩm lệch phải 4px so với tâm thẻ. Cả
hai đều là dấu vết thao tác tay trong file thiết kế chứ không phải quy tắc
bố cục.

### Ảnh đối chiếu

| Ảnh | Nội dung |
| --- | --- |
| [`shop-side-by-side.png`](docs/comparison/shop/shop-side-by-side.png) | Figma và bản code đặt cạnh nhau |
| [`shop-overlay.png`](docs/comparison/shop/shop-overlay.png) | Đè hai bản ở opacity 50 % |
| [`shop-difference.png`](docs/comparison/shop/shop-difference.png) | Bản đồ sai lệch — trắng là khớp, càng đỏ càng lệch |
| [`shop-figma.png`](docs/comparison/shop/shop-figma.png) · [`shop-build.png`](docs/comparison/shop/shop-build.png) | Hai ảnh gốc 1:1 |
| [`shop-1440.png`](docs/comparison/shop/shop-1440.png) · [`shop-768.png`](docs/comparison/shop/shop-768.png) · [`shop-375.png`](docs/comparison/shop/shop-375.png) | Ba breakpoint |

Khung Figma vẽ sẵn ba nút tròn trên thẻ sản phẩm đầu tiên — đó là trạng thái
hover được minh hoạ. Ảnh `shop-build.png` vì vậy chụp lúc con trỏ đang đặt trên
thẻ đó, để hai bản so đúng cùng một trạng thái.

Muốn tự kiểm: mở [`dev/overlay.html`](dev/overlay.html). Nó nạp trang thật vào
iframe đúng khổ 1920 rồi đè ảnh export Figma lên trên, có bốn chế độ (chỉ code /
đè 50 % / chỉ Figma / difference) và lưới 100px. Công cụ này cũng không dùng
JavaScript — nút bấm là radio input đọc bằng `:has()`.

## Landing page (`landing-page.html`)

Khung Figma **1920 × 5769**, bản dựng render ra đúng **1920 × 5769**. Header và
footer trong Figma trùng khít trang Shop (0 pixel khác) nên dùng lại nguyên
component; các khối mới là `showcase`, `discover`, `bestsellers`, `feature` và
nút elip vẽ tay `scribble-button`.

| Cách kiểm | Kết quả |
| --- | --- |
| Sai lệch màu trung bình trên toàn trang (trạng thái hover thẻ đầu, như Figma) | **4.0 / 765** |
| Tỉ lệ pixel lệch ≤ 30 / 765 · ≤ 60 / 765 | **98.5 %** · **99.0 %** |
| 9 ảnh asset (vị trí dò bằng template matching) | **0 px** |
| 31 vùng chữ / viền / hoạ tiết, dò độ dịch tốt nhất theo từng pixel | **0 px** (ba vùng còn 1 px) |
| Ba lớp nền mờ | fit bằng mô phỏng blur 260px, sai số trung bình < 2/255 mỗi kênh |

Ảnh đối chiếu nằm trong [`docs/comparison/landing/`](docs/comparison/landing/)
(`landing-figma.png`, `landing-build.png`, `-side-by-side`, `-overlay`,
`-difference`). Công cụ so sánh trực tiếp: [`dev/landing-overlay.html`](dev/landing-overlay.html)
— thêm chế độ **Kéo trượt** (CSS `resize`, vẫn không JavaScript).

Chỗ khác bản thiết kế, đều có ghi chú trong code:

- Nút **Add to Cart** chỉ thẻ đầu có trong Figma → hiểu là trạng thái hover,
  giống ba nút tròn ở trang Shop. Ảnh `landing-build.png` chụp lúc đang hover
  thẻ đầu để so cùng trạng thái.
- Vầng sáng vàng phía dưới trong Figma **đè lên** khối Bestsellers (chữ và nút
  ở thẻ đầu bị ám vàng 10–20%) nhưng nằm dưới khối Feature → `z-index: 1`
  cho vầng sáng, `z-index: 2` cho `.feature`.
- Ảnh serum Bestsellers cắt từ `Frame 9839.png` (file gốc dính sẵn chữ tên và
  giá) thành `bestseller-serum.png`.
- Chữ **"GLO." dọc** ở khối Bestsellers: Fraunces không ra đúng nét Butler ở
  cỡ ~700px, nên hình chữ được dò thẳng từ ảnh export (trừ nền, tách vùng
  chữ, vẽ lại thành path) thành `assets/img/glo-watermark-vertical.svg`.
- Chữ dọc **"fall in love with your skin"** (Century Gothic) dùng Montserrat:
  dò thử cả Mulish lẫn Montserrat, Montserrat khớp nét hơn hẳn ở chỗ này.
- Chữ **ribbon "New arrivals"** cũng là SVG dò từ ảnh export (xoay thẳng dải
  băng, lấy trung bình bốn lần lặp): `ribbon-new-arrivals.svg` và bản chữ A
  hoa `ribbon-new-arrivals-first.svg`. Section vẫn có `aria-label` và một
  dòng chữ ẩn cho trình đọc màn hình.
- **Huy hiệu "View All Products"** (hai vòng tròn, chữ chạy vòng, ba ngôi
  sao đặt tay không cách đều) là một SVG dò từ ảnh export:
  `badge-view-all-products.svg`. Link vẫn có chữ ẩn cho trình đọc màn hình;
  rê chuột chỉ mờ nhẹ, không xoay.
- Footer dùng chung với Shop nhưng Figma landing đặt vài khối lệch 1–4px →
  modifier `site-footer--landing` (chỉ `translate`, không đổi bố cục).
- **"Confidence"**: Figma ghép "fi" thành ligature; Chrome tắt ligature khi có
  letter-spacing nên cặp này để letter-spacing 0 trong một `<span>`.

## Trang sản phẩm (`product.html`)

Khung Figma **1920 × 1128**, nền tối. Header trùng vị trí trang Shop nên dùng lại
component; màu tự đổi nhờ class `theme-dark` trên `<body>` (chỉ ghi đè tầng màu
ngữ nghĩa trong `css/tokens.css`). Khối mới: `breadcrumb`, `product` (ba cột,
ô số lượng, nút Add to Cart, khung ảnh viên thuốc, chữ "GLO." chìm).

| Cách kiểm | Kết quả |
| --- | --- |
| 18 vùng chữ / icon / viền, so khung bao từng vùng | **0 px** (vài mép còn 1 px) |
| Hũ kem (`product-jar-upright.png`), fit cỡ + vị trí trên ảnh export | 267 × 260 tại (808.5, 493.5), sai số 2.4/255 |
| Nền + vầng sáng + chữ "GLO." chìm (so sau khi làm mịn 6px) | **1.6 / 765** |
| Sai lệch màu trung bình từng pixel | 7.7 / 765, gần hết là do hạt sạn giấy ngẫu nhiên (xem dưới) |
| Tỉ lệ pixel lệch ≤ 30 / 765 · ≤ 60 / 765 | **99.0 %** · **99.5 %** |

Ảnh đối chiếu: [`docs/comparison/product/`](docs/comparison/product/). Công cụ
so sánh trực tiếp: [`dev/product-overlay.html`](dev/product-overlay.html).

Chỗ cần biết, đều có ghi chú trong code:

- **Lớp sạn giấy.** Nền Figma `#0D272F` phủ texture hạt (tối đi trung bình ~6.5%,
  lệch ~6% giá trị màu, hạt 1–2px); vầng sáng vì thế để 32% thay vì 30%.
  Dựng lại bằng `feTurbulence` trong SVG nhúng, hoà `soft-light`; độ mạnh và cỡ
  hạt đã dò cho khớp thống kê ảnh export. Hạt là ngẫu nhiên nên không thể trùng
  từng pixel — đây là phần lớn con số 7.7 ở bảng trên.
- **Ký hiệu "₹"**: Fraunces không có ký tự này, Figma và trình duyệt đều mượn
  font dự phòng (mỗi bên một kiểu). Hình "₹" của Figma được dò từ ảnh export
  (`assets/img/rupee-sign.svg`) và nhúng làm `mask` dạng data URI — nhúng thẳng
  vì Chrome chặn mask trỏ ra file riêng khi mở trang bằng `file://`. Chữ "₹"
  thật vẫn nằm trong HTML (trong suốt) cho trình đọc màn hình và khi copy.
- **Chữ "GLO." chìm** dùng đúng Fraunces 900 như inspector ghi, khớp ảnh export.
  Nó gắn vào khung ảnh và tính bằng đơn vị `cqi`, nên co cùng khung ở màn hình
  nhỏ.
- **Logo "Glo."** (dùng chung cả ba trang) đổi sang đúng số inspector:
  Cormorant Garamond 61.17px, giãn 2% (trước đây dò 63px, không giãn — khung
  bao bằng nhau nhưng nét lệch). Sai lệch vùng header trang Shop giảm
  7.7 → 2.5 / 765.
- **Hàng link nav** trên nền tối Figma để đậm 700, cỡ 24px, giãn 2% (Shop là
  600 / 25px) → modifier `site-header--product`.
- **Icon header**: bản `*-light.png` là chính file PNG khách cung cấp, chỉ đổi
  màu nét sang `#BBB2B0`, giữ nguyên kênh alpha.
- **Ô số lượng** không có JavaScript: "−" / "+" là nút submit gửi kèm bước
  cộng/trừ để máy chủ tính lại; ô số gõ trực tiếp được.
- Tên sản phẩm giữ đúng chữ trong Figma: "Night **Crem**" — có thể là lỗi
  chính tả, cần khách xác nhận.
- Figma không vẽ footer cho trang này nên trang dừng ở 1128px như khung thiết kế.

## Giỏ hàng (`product.html#cart`)

Khung Figma **Cart Modal 1920 × 1128**: trang sản phẩm bị làm mờ phía sau, ngăn
kéo giỏ hàng bên phải. Không dựng thành trang riêng mà là ngăn kéo **trên chính
trang sản phẩm**, mở bằng `:target` — icon túi ở header trỏ tới `#cart`, nút ✕
và vùng nền mờ trỏ về `#`. Vẫn không một dòng JavaScript.

| Cách kiểm | Kết quả |
| --- | --- |
| 16 vùng chữ / icon / giá / nút trong ngăn, so khung bao từng vùng | **0 px** (nút còn 1 px mép do toạ độ lẻ 259.5) |
| Sai lệch màu trung bình toàn khung | **2.1 / 765** (ngăn kéo 2.2, nền mờ 2.1) |
| Tỉ lệ pixel lệch ≤ 30 / 765 · ≤ 60 / 765 | **99.5 %** · **99.7 %** |

Ảnh đối chiếu: [`docs/comparison/cart/`](docs/comparison/cart/). Công cụ so
sánh: [`dev/cart-overlay.html`](dev/cart-overlay.html).

- **Nền mờ phía sau**: `backdrop-filter: blur(4.5px) brightness(0.9)` trên vùng
  bên trái ngăn kéo — fit trên ảnh export (trang sản phẩm mờ ~4.5px, tối 10%).
- **Vầng hồng đầu ngăn**: elip `#FDDEDE` 780 × 586, blur 82px — fit mô phỏng blur.
- **"30ml ⌄" và "Qty : 1 ⌄"** là hai `<select>` thật (bỏ giao diện mặc định,
  mũi tên vẽ bằng SVG nền) — đổi được mà không cần JavaScript.
- **Ký hiệu "₹"**: Mulish cũng không có ký tự này. Ba kiểu ₹ (giá cũ xám, giá
  mới đậm, tổng tiền 24px) lấy thẳng kênh alpha từ ảnh export làm mask PNG
  (`assets/img/rupee-cart*.png`, nhúng data URI). Nét 16px quá mảnh để dò
  vector, nên dùng mask điểm ảnh cho đúng từng pixel.
- Ảnh hũ trong ô: `product-jar-upright.png` 62 × 60, fit vị trí trên ảnh export.
- Icon túi dùng `icon-bag.png`; icon đóng là `close-circle-line.png` khách cung cấp.
- Khi giỏ hàng mở, dòng breadcrumb của trang phía sau ẩn đi (`visibility:
  hidden`, bố cục không đổi) — đúng như khung Figma Cart Modal.

## Quy trình chuyển đổi

1. **Lấy số liệu.** Export frame Figma ra PNG tỉ lệ 1:1. Những gì đọc được
   trong panel inspector (màu, toạ độ, kích thước lớp trang trí) thì lấy thẳng;
   phần còn lại đo bằng script quét pixel trên ảnh export — mép nét chữ, bề
   ngang khối, bước dòng.
2. **Dựng token.** Giá trị dùng chung (màu, font, thang độ đậm, leading,
   chuyển động) là custom property trong `css/tokens.css`. Số đo riêng của từng
   component ghi thẳng trong file component đó. Mọi con số đều kèm nhãn nguồn
   gốc ngay bên cạnh: `[FIGMA]` đọc từ inspector, `[ĐO]` đo từ ảnh export,
   `[MẪU]` lấy từ file asset. Số nào dùng ở nhiều rule trong cùng component thì
   làm biến cục bộ trên selector gốc của component, để chỉ phải sửa một chỗ.
3. **Viết HTML semantic trước, CSS sau.** Landmark đầy đủ, một `h1` duy nhất,
   `fieldset`/`legend` thật cho nhóm filter, `label` gắn đúng input, nút là
   `<button>`.
4. **Vòng lặp đo – sửa.** Render bằng Playwright ở 1920, quét pixel, so với ảnh
   export, sửa **một** số đo, render lại. Lặp tới khi 19 mốc đo đều nằm trong
   vài pixel. Riêng font hero thì render thử 16 họ chữ serif, mỗi họ tự giải cỡ
   chữ và letter-spacing sao cho khối chữ đúng 934 × 72 px, rồi chọn họ có sai
   lệch pixel nhỏ nhất.
5. **Kiểm lại.** axe-core (0 lỗi), Lighthouse, và kiểm tràn ngang ở
   1440 / 768 / 375 / 320.

## Font thay thế

Bản thiết kế dùng bốn font thương mại. Dự án thay bằng bốn font giấy phép
**SIL Open Font License** — dùng thương mại thoải mái — và **tự lưu file woff2
trong `assets/fonts/`** thay vì gọi Google Fonts: trang không phụ thuộc máy chủ
ngoài, không gửi IP người xem sang bên thứ ba (GDPR), và chữ hiện sớm hơn vì
bớt một vòng DNS + TLS.

| Phần tử | Font gốc | Font đang dùng | Độ đậm nạp |
| --- | --- | --- | --- |
| Logo "Glo.", tiêu đề hero | Roghiska | **Cormorant Garamond** | 400 |
| Chữ "GLO." chìm, dải ribbon, heading footer, giá | Butler | **Fraunces** (biến thiên, có trục opsz) | 100–900 |
| Tên sản phẩm, nút Subscribe | Gotham | **Montserrat** | 400, 700 |
| Nav, cột filter, link footer, ô nhập, pagination, chữ trang sản phẩm | Century Gothic | **Mulish** | 400, 500, 600, 700 |

Bốn font này do khách chốt theo bảng đối chiếu weight — điểm quan trọng là mỗi
họ đều có sẵn đủ các độ đậm bản thiết kế cần, nên không chỗ nào phải để trình
duyệt tự làm giả nét đậm (chữ sẽ bệt và rộng ra).

Mỗi file chỉ chứa bảng mã latin; tổng 9 file ≈ 158 KB. Nếu sau này mua được giấy
phép font thật, chỉ cần thêm `@font-face` vào `css/fonts.css` rồi đặt tên font
đó lên đầu stack trong `css/tokens.css` — không phải sửa dòng nào trong
component.

## Điểm Lighthouse

Chạy trên bản tĩnh, Chromium headless.

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | **100** | **100** | **100** | **100** |
| Mobile | **93** | **100** | **100** | **100** |

**axe-core: 0 lỗi.** Tương phản chữ đạt WCAG AA, viền ô tick và ô nhập đạt 3:1
theo tiêu chí non-text contrast.

7 điểm performance thiếu ở mobile đến từ bộ icon PNG khách cung cấp chỉ có bản
1x (36 px): trên màn hình DPR 2, Lighthouse coi là thiếu độ phân giải. Xin được
bản SVG hoặc @2x là hết.

## Những quyết định tôi tự đưa ra

Bản thiết kế chỉ có desktop 1920 và là một khung tĩnh, nên những chỗ sau là
quyết định của tôi chứ không suy ra được từ file Figma:

- **Toàn bộ phần responsive.** Từ 1024px xuống, cột filter nằm trên lưới sản
  phẩm; footer chỉ chia 4 cột từ 1440px (hẹp hơn thì ba cột cố định 1013px
  không còn chỗ cho cột cuối); dưới 768px lưới về 1 cột, logo và bốn icon header nhỏ lại cho vừa hàng,
  hàng mạng xã hội ở footer xuống dòng. Cỡ chữ hero và chữ "GLO." chìm co theo
  bề ngang màn hình để không bị cắt. Đã kiểm không tràn ngang tới tận 320px.
- **Ba nút tròn trên thẻ sản phẩm là trạng thái hover.** Trong Figma chỉ thẻ
  đầu tiên có chúng, nên tôi hiểu đó là hover state vẽ sẵn để minh hoạ. Hàng nút
  luôn chiếm sẵn chỗ trong layout nên không thẻ nào nhảy khi rê chuột, và nó
  cũng hiện ra khi tab bằng bàn phím vào trong thẻ.
- **Hai chỗ chỉnh màu cho đạt WCAG AA**, đều có ghi chú ngay trong code:
  - nhãn "5 star / 4 star…" và số trang chưa chọn: Figma để `#A9967F`
    (tương phản 2.66:1, dưới chuẩn) → đổi thành `rgb(88 54 13 / 72%)` = 4.62:1;
  - viền ô tick và ô nhập email: Figma để `#F4EBDF` (1.1:1, gần như vô hình) →
    đổi thành `rgb(88 54 13 / 56%)` = 3.07:1.

  Muốn giữ đúng màu Figma thì sửa hai dòng `--text-idle` và `--border-control`
  trong `css/tokens.css` là xong — nhưng khi đó điểm accessibility rơi khỏi 100.
- **Độ mờ của hai lớp trang trí.** Figma ghi "layer blur 600" nhưng thang blur
  của Figma không cùng đơn vị với `filter: blur()` của CSS. Tôi quét thử nhiều
  giá trị rồi chọn giá trị khớp ảnh export nhất: **260px** cho cả vầng sáng vàng
  lẫn khối hồng.
- **Sáu ảnh sản phẩm được đặt tay trong Figma**, không tấm nào căn giữa ô hoàn
  toàn. Tôi đo độ lệch từng tấm bằng cách so trọng tâm vùng tối, rồi ghi vào
  sáu modifier `.card__media--1…6` (cặp `--img-dx` / `--img-dy`); dùng
  `translate` nên không tấm nào làm xê dịch phần chữ bên dưới.
- **Hàng sản phẩm thứ hai** để khối chữ thấp hơn hàng đầu 20px — cũng là do đặt
  tay trong Figma, nên tôi ghi thành một số đo riêng thay vì làm tròn cho đều.
- **Dải ribbon để tĩnh, không chạy.** Bản thiết kế là khung tĩnh nên tôi giữ
  nguyên; muốn cho chạy thì thêm một `@keyframes` dịch ngang là đủ, vẫn không
  cần JavaScript.
- **Bề ngang tên sản phẩm để 290px** thay vì 277px của bản thiết kế, để
  Montserrat (đã giãn chữ 0.5px cho khớp bề ngang Gotham) còn ngắt đúng hai
  dòng. Đây chỉ là giới hạn tối đa của hộp chữ, chữ vẫn căn giữa nên không nhìn
  ra được.

## Cấu trúc

```
index.html              trang Shop, không thẻ <script> nào
landing-page.html       landing page, không thẻ <script> nào
product.html            trang sản phẩm, không thẻ <script> nào
css/
├── reset.css           reset hiện đại, layer thấp nhất
├── fonts.css           11 khai báo @font-face, trỏ vào assets/fonts/
├── tokens.css          design token dùng chung (màu, font, leading, chuyển động)
├── base.css            mặc định cho thẻ, nhịp chữ
├── layout.css          container, hai lớp trang trí, lưới Shop
├── components/         nav, hero, filter, card, pagination, marquee, footer,
│                       showcase, discover, bestsellers, feature, button,
│                       breadcrumb, product, cart
└── utilities.css       visually-hidden, skip-link
assets/
├── fonts/              10 file woff2, bảng mã latin
├── icon/               icon PNG khách cung cấp
└── img/                ảnh sản phẩm (đã cắt sát mép, bỏ lề trong suốt)
dev/overlay.html        công cụ đè ảnh Figma lên trang Shop
dev/landing-overlay.html  như trên, cho landing page
dev/product-overlay.html  như trên, cho trang sản phẩm
dev/cart-overlay.html   như trên, cho giỏ hàng (product.html#cart)
docs/comparison/        bộ ảnh đối chiếu (shop/, landing/, product/, cart/)
```

CSS tổ chức bằng **cascade layer gốc của trình duyệt** — `reset, tokens, base,
layout, components, utilities` — thứ tự khai báo một lần trong `<head>`. Nhờ vậy
độ ưu tiên không phụ thuộc thứ tự file, và **toàn bộ codebase không có một
`!important` nào** ngoài khối `prefers-reduced-motion` (chỗ bắt buộc phải có).

Đặt tên theo BEM, specificity phẳng, không selector nào lồng quá một cấp, không
dùng ID để style.

## Không flexbox, không grid

Theo yêu cầu, toàn bộ bố cục dựng bằng kỹ thuật CSS trước thời flexbox —
trong `css/` không có một dòng `display: flex`, `display: grid` hay thuộc
tính `gap` nào:

| Chỗ cần bố cục | Cách làm |
| --- | --- |
| Hai cột trang Shop, lưới sản phẩm 3 cột, 4 cột chân trang | `float` + bề ngang tính bằng `calc()`, tự dọn float bằng `::after { clear: both }` |
| Hàng mới của lưới sản phẩm | `clear: left` trên thẻ đầu mỗi hàng, nên hàng sau luôn nằm dưới thẻ cao nhất của hàng trước |
| Cột sản phẩm không bị cột filter đẩy xuống | `display: flow-root` tạo ngữ cảnh định dạng riêng |
| Căn dọc hàng header, ô ảnh sản phẩm, nút tròn, hàng mạng xã hội | `line-height` bằng đúng chiều cao hộp + `vertical-align: middle` |
| Hàng ngang: link nav, icon, nút thẻ, pagination, dải ribbon, breadcrumb, ô số lượng | `display: inline-block` + `margin` |
| Bốn icon bám mép phải header | `position: absolute` |
| Ba cột trang sản phẩm | cột trái `float: left`, cột phải `float: right`, khung ảnh giữa `position: absolute` |
| "Filter" trái — "Clear all" phải | hai `float` ngược chiều |
| Ô nhập email — nút Subscribe | `float` trái/phải, nút đẩy xuống nửa phần chênh chiều cao |
| Dấu tick trong ô checkbox | `position: absolute` trong ô |

Chỗ dùng `inline-block` đều đặt `font-size: 0` ở phần tử cha rồi khai lại cỡ
chữ ở từng con — nếu không, mỗi lần xuống dòng trong HTML sẽ thành một khoảng
trắng thật và làm sai khoảng cách đã đo. Cùng lý do đó, chữ "Shop" và mũi tên
cạnh nó trong `index.html` phải viết liền nhau trên một dòng.

Đổi cách dựng nhưng **không đổi một con số đo nào**: trang vẫn cao đúng
2748px và 19 mốc đo vẫn nằm trong 5px.

## Không JavaScript — làm thế nào

| Thành phần | Cách làm |
| --- | --- |
| Giỏ hàng dạng ngăn kéo | `:target` (`#cart`), nền mờ bằng `backdrop-filter` |
| Menu mobile | `<details>` / `<summary>`, mở ở desktop bằng cách ghi đè `::details-content` |
| Hàng nút trên thẻ | `:hover` và `:focus-within` |
| Vòng tròn vẽ tay quanh *Subscribe* | hai pseudo-element bo tròn, xoay −16.4° và −7.17° |
| Dải ribbon nghiêng | `rotate` + `overflow: clip` ở cấp trang |
| Vầng sáng vàng, khối hồng | hai `<div>` rỗng bo tròn + `filter: blur()` |
| Chữ "GLO." chìm | `content` của pseudo-element với alt rỗng, trình đọc màn hình bỏ qua |
| Công cụ overlay trong `dev/` | radio input + `:has()` |

## Chạy thử

```bash
npm install     # chỉ để có browser-sync, trang không cần build
npm run dev     # http://localhost:3000, tự reload khi sửa file
```

Không có npm cũng chạy được — mở thẳng `index.html`, hoặc:

```bash
python3 -m http.server 3000
```

## Deploy

Trang tĩnh, không lệnh build. `netlify.toml` đã cấu hình sẵn header bảo mật và
cache cho asset — kéo thư mục vào Netlify hoặc trỏ repo vào là xong.

## Còn cần gì từ phía khách

- **Icon bản SVG hoặc @2x.** Bộ PNG hiện tại chỉ 36px nên hơi rỗ trên màn hình
  retina; đây cũng là thứ duy nhất kéo điểm performance mobile xuống 94.
- **Xác nhận dải ribbon có chạy không**, và tốc độ mong muốn.
- **File Figma trang Checkout** — export 1:1 là dựng tiếp được ngay, token đã
  dùng chung.
- **Xác nhận tên sản phẩm** "Mixed Grapes Sulphate Free Night Crem" (thiếu chữ
  "a" trong "Cream"?).

## Nguồn thiết kế

Modern E-Commerce UI Kit, Figma Community. Kiểm tra badge license của file và
ghi lại ở đây trước khi publish.
