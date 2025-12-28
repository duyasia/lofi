# Project Overview & PDR

## Project Description
Lofi là một ứng dụng web nghe nhạc thư giãn, tập trung vào việc tạo ra không gian làm việc và học tập hiệu quả. Người dùng có thể tùy chỉnh môi trường âm thanh (tiếng mưa, tiếng ồn trắng) và bối cảnh hình ảnh (video backgrounds) theo sở thích.

## Technical Stack
- **Frontend**: React 18, TypeScript 5.
- **Styling**: SCSS, Material UI (MUI), Tailwind CSS.
- **State Management**: React Context API.
- **Testing**: Jest, React Testing Library, Playwright (E2E).

## Functional Requirements
1. **Audio Playback**: Phát nhạc lofi chất lượng cao từ danh sách có sẵn.
2. **Atmospheric Sounds**: Tùy chỉnh các âm thanh môi trường như tiếng mưa, tiếng phố xá, tiếng bàn phím.
3. **Dynamic Backgrounds**: Thay đổi bối cảnh video theo tâm trạng (Chill, Jazzy, Sleepy).
4. **Productivity Tools**: Tích hợp Pomodoro timer và các công cụ hỗ trợ tập trung.
5. **Responsive Design**: Hoạt động tốt trên cả desktop và mobile.

## Non-functional Requirements
1. **Performance**: Thời gian tải trang dưới 2 giây. Lazy loading cho các component lớn và video.
2. **Reliability**: Tỷ lệ test coverage cao cho các logic core và UI component quan trọng.
3. **User Experience**: Giao diện trực quan, tối giản, không gây xao nhãng.

## Success Metrics
- 100% Core Contexts được test.
- 100% Lateral Menu Panels được test (Phase 01 complete).
- Ứng dụng vượt qua các bài kiểm tra E2E cơ bản.
- **Phase 01 Scene Navigation**: Cho phép người dùng chuyển đổi mượt mà giữa các bối cảnh (Exterior, Book Cafe).
