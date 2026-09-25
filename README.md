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
| Nav, cột filter, link footer, ô nhập, pagination | Century Gothic | **Mulish** | 400, 500, 600 |

Bốn font này do khách chốt theo bảng đối chiếu weight — điểm quan trọng là mỗi
họ đều có sẵn đủ các độ đậm bản thiết kế cần, nên không chỗ nào phải để trình
duyệt tự làm giả nét đậm (chữ sẽ bệt và rộng ra).

Mỗi file chỉ chứa bảng mã latin; tổng 8 file ≈ 145 KB. Nếu sau này mua được giấy
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
  phẩm; dưới 768px lưới về 1 cột, logo và bốn icon header nhỏ lại cho vừa hàng,
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
index.html              một file, không thẻ <script> nào
css/
├── reset.css           reset hiện đại, layer thấp nhất
├── fonts.css           10 khai báo @font-face, trỏ vào assets/fonts/
├── tokens.css          design token dùng chung (màu, font, leading, chuyển động)
├── base.css            mặc định cho thẻ, nhịp chữ
├── layout.css          container, hai lớp trang trí, lưới Shop
├── components/         nav, hero, filter, card, pagination, marquee, footer
└── utilities.css       visually-hidden, skip-link
assets/
├── fonts/              9 file woff2, bảng mã latin
├── icon/               icon PNG khách cung cấp
└── img/                ảnh sản phẩm (đã cắt sát mép, bỏ lề trong suốt)
dev/overlay.html        công cụ đè ảnh Figma lên bản code
docs/comparison/shop/   bộ ảnh đối chiếu
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
| Hàng ngang: link nav, icon, nút thẻ, pagination, dải ribbon | `display: inline-block` + `margin` |
| Bốn icon bám mép phải header | `position: absolute` |
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
- **File Figma hai trang còn lại** (Product description, Checkout) — export 1:1
  như trang này là dựng tiếp được ngay, token đã dùng chung.

## Nguồn thiết kế

Modern E-Commerce UI Kit, Figma Community. Kiểm tra badge license của file và
ghi lại ở đây trước khi publish.
