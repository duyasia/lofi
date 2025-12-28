# Nghiên cứu di chuyển TypeScript cho dự án Create React App (CRA)

## 1. Cách tiếp cận di chuyển dần dần (Gradual Migration)
CRA 5.0 hỗ trợ TypeScript sẵn có. Để hỗ trợ cả `.js` và `.tsx`:
1. **Cài đặt dependencies**: `npm install --save-dev typescript @types/node @types/react @types/react-dom @types/jest`
2. **Khởi tạo TS**: Tạo file `tsconfig.json` trống ở root và chạy `npm start`. CRA sẽ tự động điền các thiết lập mặc định.
3. **Chế độ hỗn hợp**: Giữ nguyên file `.js/.jsx`. Khi muốn di chuyển, đổi tên thành `.ts/.tsx`. CRA sẽ biên dịch cả hai loại file.

## 2. Cấu hình TypeScript (tsconfig.json) cho React 18 + CRA
Cấu hình tối ưu (được CRA tự động tạo/khuyến nghị):
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 3. Các gói Type Definitions cần thiết
Cần cài đặt các gói sau cho dự án hiện tại:
- **Cơ bản**: `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `@types/jest`
- **Thư viện**:
  - `@mui/material`: Có sẵn types (không cần `@types/mui`).
  - `@tippyjs/react`: Có sẵn types.
  - `sass`: Không cần types riêng (CRA xử lý file `.scss`).
  - `react-router-dom`: Có sẵn types.

## 4. Bẫy thường gặp khi di chuyển React Context
Dự án có 3 Context (`AudioContext`, `VideoContext`, `UIContext`). Các lỗi phổ biến:
- **Giá trị khởi tạo**: `createContext<AudioContextType | undefined>(undefined)`. Cần kiểm tra null/undefined trong custom hook.
- **useState**: TypeScript thường tự suy luận, nhưng với object phức tạp hoặc null, dùng: `useState<Song | null>(null)`.
- **useCallback/useMemo**: Đảm bảo các hàm handler có type cho tham số (ví dụ: `(value: number) => void`).
- **Children**: Sử dụng `React.ReactNode` cho prop `children` trong Provider.

## 5. Quy ước đặt tên File
- **`.tsx`**: Cho các files chứa React Components (JSX). Ví dụ: `App.tsx`, `AudioProvider.tsx`.
- **`.ts`**: Cho các files logic thuần, helpers, constants, hoặc định nghĩa types. Ví dụ: `dataSong.ts`, `types.ts`.

## Các bước thực hiện nhanh
1. Chạy lệnh cài đặt các gói `@types` và `typescript`.
2. Tạo file `tsconfig.json` và khởi động lại server.
3. Tạo file `src/types/index.ts` để định nghĩa các interfaces chung cho dự án (Song, AudioState, v.v.).
4. Di chuyển lần lượt các file Context (`src/store/*.jsx` -> `.tsx`) vì đây là xương sống của data flow.

**Câu hỏi chưa giải quyết:**
- Có cần cấu hình `baseUrl` và `paths` trong `tsconfig.json` để hỗ trợ absolute imports (đang dùng `../data/dataSong`)?
- Các file ảnh/video trong `public` và `assets` có cần định nghĩa module declaration (`.d.ts`) để tránh lỗi import trong TS?
