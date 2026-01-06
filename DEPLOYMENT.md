# Hướng dẫn triển khai trên EasyPanel

## Cấu hình Build trên EasyPanel

### 1. Build Method
Chọn: **Nixpacks** (hoặc **Buildpacks**)
- Nixpacks tự động detect React app và cấu hình phù hợp
- Buildpacks cũng hỗ trợ tốt cho Node.js/React apps

### 2. Version
- **Nixpacks**: `1.34.1` (hoặc version mới nhất)
- **Buildpacks**: Để mặc định

### 3. Install Command
```
npm install --legacy-peer-deps
```

**QUAN TRỌNG**: Dự án sử dụng TypeScript 5.9.3 nhưng `react-scripts@5.0.1` yêu cầu TypeScript 4.x. 
- File `.npmrc` đã được tạo với `legacy-peer-deps=true` để tự động xử lý conflict
- Tuy nhiên, để đảm bảo trên EasyPanel, nên điền rõ: `npm install --legacy-peer-deps`

### 4. Build Command
```
npm run build
```
Hoặc:
```
npm run build
```

### 5. Start Command
Vì đây là static React app, bạn cần serve files từ thư mục `build/`. 

**Khuyến nghị: Sử dụng `serve` package**
```
npm run serve
```

Hoặc nếu chưa cài serve:
```
npx serve -s build -l 4000
```

**Lưu ý về PORT:**
- Thay `4000` bằng PORT mà EasyPanel cung cấp (thường là biến môi trường `$PORT`)
- Nếu EasyPanel tự động set PORT, dùng: `npx serve -s build -l $PORT`

### 6. Nix Packages (Nếu dùng Nixpacks)
Để trống (không cần thêm packages)

### 7. APT Packages (Nếu dùng Buildpacks)
Để trống (không cần thêm packages)

## Cấu hình bổ sung

### Environment Variables (nếu cần)
- `PORT`: `4000` (hoặc port mà EasyPanel cung cấp)
- `NODE_ENV`: `production`

### Root Directory
Để mặc định (root của repository)

### Output Directory
- Nếu cần chỉ định: `build`

## Lưu ý

1. **Static Files**: Sau khi build, tất cả files tĩnh sẽ nằm trong thư mục `build/`
2. **Port**: Đảm bảo port trong Start Command khớp với port mà EasyPanel cung cấp
3. **Node Version**: EasyPanel sẽ tự động detect Node.js version từ `package.json` hoặc `.nvmrc`
4. **Build Time**: Build process có thể mất vài phút tùy vào kích thước dự án

## Tóm tắt cấu hình nhanh

```
Build Method: Nixpacks
Version: 1.34.1
Install Command: npm install --legacy-peer-deps
Build Command: npm run build
Start Command: npm run serve
Nix Packages: (để trống)
APT Packages: (để trống)
```

## Xử lý lỗi thường gặp

### Lỗi 1: ERESOLVE could not resolve (TypeScript conflict)
**Giải pháp**: Đảm bảo Install Command có `--legacy-peer-deps`
- File `.npmrc` đã được tạo nhưng một số platform có thể không đọc file này trong quá trình build

### Lỗi 2: Cannot find module 'chalk'
**Giải pháp**: 
1. Đã thêm `chalk@^3.0.0` vào dependencies trong `package.json` (version 3.x dùng CommonJS, tương thích với react-dev-utils)
2. Đã tạo file `.dockerignore` để ngăn Nixpacks copy lại `node_modules` sau khi install
- Chalk là dependency của `react-dev-utils` (được sử dụng bởi react-scripts)
- Chalk 4.x dùng ESM, có thể không tương thích với react-dev-utils
- Chalk 3.x dùng CommonJS, tương thích tốt hơn
- Nếu vẫn lỗi, thử dùng Buildpacks thay vì Nixpacks

### Nếu vẫn gặp lỗi với Nixpacks
Thử chuyển sang **Buildpacks**:
```
Build Method: Buildpacks
Install Command: npm install --legacy-peer-deps
Build Command: npm run build
Start Command: npm run serve
```

**Hoặc nếu EasyPanel có biến môi trường PORT:**
```
Start Command: npx serve -s build -l $PORT
```

## Kiểm tra sau khi deploy

1. Đảm bảo build thành công (không có lỗi)
2. Kiểm tra thư mục `build/` có được tạo ra
3. Verify static files được serve đúng
4. Kiểm tra console logs để đảm bảo app chạy đúng port

