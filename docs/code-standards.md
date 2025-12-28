# Code Standards

## General Guidelines
- Tuân thủ nguyên tắc **KISS** (Keep It Simple, Stupid) và **DRY** (Don't Repeat Yourself).
- Sử dụng **TypeScript** cho toàn bộ mã nguồn mới và đã chuyển đổi.
- Đảm bảo tính nhất quán trong cách đặt tên và cấu trúc thư mục.

## Naming Conventions
- **Components**: PascalCase (ví dụ: `LateralMenu.tsx`).
- **Files/Folders**: PascalCase cho components, camelCase cho utilities và hooks.
- **Variables/Functions**: camelCase.
- **Interfaces/Types**: PascalCase, bắt đầu bằng `I` (tùy chọn) hoặc tên mô tả.

## TypeScript Standards
- Hạn chế sử dụng `any`. Sử dụng `unknown` nếu không chắc chắn về kiểu dữ liệu.
- Định nghĩa interface cho Props của component.
- Sử dụng path alias nếu cấu hình cho phép (hiện tại đang dùng relative paths).

## CSS/Styling
- Ưu tiên sử dụng SCSS Modules hoặc Tailwind CSS để tránh xung đột class.
- Biến màu sắc và font chữ nên được tập trung trong file variables.

## Testing Standards
- Mỗi component quan trọng phải có file `.test.tsx` tương ứng.
- Test phải cover các trường hợp:
  - Render đúng trạng thái ban đầu.
  - Xử lý đúng các tương tác người dùng (click, change).
  - Tích hợp đúng với Context/State.
- Mock các dependency lớn hoặc API calls.

## Component Structure
```tsx
import React from 'react';
import './ComponentName.scss';

interface ComponentNameProps {
  // props definitions
}

export const ComponentName: React.FC<ComponentNameProps> = ({ ... }) => {
  // hooks
  // handlers
  return (
    <div className="component-name">
      {/* content */}
    </div>
  );
};
```
