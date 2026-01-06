# Design Guidelines

Tài liệu này hướng dẫn về hệ thống thiết kế (Design System), design tokens và các nguyên tắc UI/UX được áp dụng trong dự án Starbeans Lofi.

## Modernization Approach

Ứng dụng đang chuyển hướng sang phong cách hiện đại, sử dụng các lớp phủ (overlays) trong suốt, bo góc lớn (large border-radius) và hệ thống typography phân cấp rõ rệt.

### Key Principles
- **Transparency**: Sử dụng `rgba` cho các bề mặt (surfaces) để tạo hiệu ứng glassmorphism.
- **Elevation**: Sử dụng soft shadows thay vì border để phân biệt các lớp UI.
- **Responsiveness**: Ưu tiên sử dụng Tailwind CSS cho layout và spacing.

## Typography

Chúng tôi sử dụng 4 bộ font chính được tích hợp qua Google Fonts:

| Font Family | Usage | Characteristics |
| :--- | :--- | :--- |
| **Sora** | Display, Headings | Hiện đại, geometric, dễ đọc ở kích thước lớn. |
| **Space Grotesk** | Display, Accent | Phong cách tech-inspired, độc đáo. |
| **Inter** | Body, UI | Trung tính, tối ưu cho giao diện người dùng. |
| **Manrope** | Secondary Body | Geometric sans-serif, sạch sẽ. |

### CSS Variables
- `--font-display`: `"Sora", "Space Grotesk", system-ui, sans-serif`
- `--font-body`: `"Inter", "Manrope", system-ui, sans-serif`

## Color System (Design Tokens)

Tất cả màu sắc phải được sử dụng thông qua các CSS variables được định nghĩa tại `src/index.css`.

### Base Colors
| Variable | Value | Description |
| :--- | :--- | :--- |
| `--color-bg` | `#0f1116` | Màu nền chính của ứng dụng. |
| `--color-surface` | `rgba(17, 24, 39, 0.6)` | Màu nền cho các panel, menu (Glassmorphism). |
| `--color-ink` | `#f5f7fb` | Màu chữ chính (High contrast). |
| `--color-muted` | `#9aa3b2` | Màu chữ phụ, disabled hoặc placeholder. |

### Accent Colors
| Variable | Value | Description |
| :--- | :--- | :--- |
| `--color-accent` | `#f1a45a` | Màu nhấn chủ đạo (Starbeans Orange). |
| `--color-accent-strong` | `#f6b36c` | Màu nhấn khi hover hoặc active. |

### Theme Specific
- `--color-night`: `#10205f` (Sử dụng cho Night mode toggle).
- `--color-day`: `#f1a45a` (Sử dụng cho Day mode toggle).

## Effects & Shape

### Shadows
- `--shadow-soft`: `0 10px 30px rgba(5, 10, 24, 0.35)`
- `--shadow-elevated`: `0 20px 60px rgba(5, 10, 24, 0.45)`

### Border Radius
- `--radius-sm`: `8px`
- `--radius-md`: `12px`
- `--radius-lg`: `20px`

## Utility Classes

Dự án cung cấp một số utility classes trong SCSS để đồng bộ hóa việc sử dụng token:

- `.bg-accent`: `background-color: var(--color-accent)`
- `.bg-night`: `background-color: var(--color-night)`
- `.bg-menu`: `background-color: var(--color-menu-bg)`
- `.hover-accent`: Thay đổi background sang accent khi hover.
- `.border-separator`: `border-color: rgba(255, 255, 255, 0.2)`
