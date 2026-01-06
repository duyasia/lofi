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
npm install
```
Hoặc để trống (Nixpacks/Buildpacks sẽ tự động chạy `npm install`)

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
Install Command: (để trống - tự động)
Build Command: npm run build
Start Command: npm run serve
Nix Packages: (để trống)
APT Packages: (để trống)
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

