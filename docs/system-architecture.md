# System Architecture

## Architecture Overview
Ứng dụng được xây dựng theo kiến trúc Component-based của React, sử dụng Context API để quản lý global state một cách phân tán (Separation of Concerns).

## Data Flow
1. **User Interaction**: Người dùng tương tác với UI (Header, Player, LateralMenu).
2. **Context Update**: Các handler gọi hàm từ Context (AudioContext, UIContext, VideoContext).
3. **State Propagation**: Context cập nhật state, kích hoạt render lại các component liên quan.
4. **Side Effects**: `useEffect` xử lý các tác vụ như play/pause audio, thay đổi video source.

## Component Hierarchy
- `App`: Gốc ứng dụng, bọc trong các Context Providers.
  - `Home` / `BookCafe`: Page components.
    - `Header`: Thanh điều hướng và logo.
    - `LateralMenu`: Menu bên phải chứa các Panels điều khiển.
    - `Player`: Thanh điều khiển nhạc bên dưới.
    - `VideoBackground`: Lớp nền video phía sau UI.

## State Management (Contexts)
- **AudioContext**: Quản lý âm lượng, danh sách nhạc, bài hát hiện tại, và các hiệu ứng âm thanh môi trường.
- **UIContext**: Quản lý việc hiển thị các panels, theme, và các trạng thái giao diện khác.
- **VideoContext**: Quản lý video background hiện tại và logic chuyển đổi cảnh.

## Testing Strategy
- **Unit Tests**: Kiểm tra logic trong các hàm helper và hooks.
- **Integration Tests**: Kiểm tra sự tương tác giữa Component và Context.
- **E2E Tests**: Kiểm tra luồng người dùng hoàn chỉnh trên trình duyệt thật bằng Playwright.
