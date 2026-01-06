# Hướng dẫn triển khai trên EasyPanel

## Phương pháp triển khai

Có 3 phương pháp để triển khai trên EasyPanel:
1. **Dockerfile** (Khuyến nghị - ổn định nhất)
2. **Nixpacks** (Tự động detect)
3. **Buildpacks** (Tự động detect)

---

## Phương pháp 1: Dockerfile (Khuyến nghị)

### Cấu hình trên EasyPanel

1. **Build Method**: Chọn **Dockerfile**
2. **Dockerfile Path**: `Dockerfile` (hoặc để mặc định)
3. **Docker Context**: `.` (hoặc để mặc định)
4. **Port**: `4000` (hoặc port mà EasyPanel cung cấp)

### Environment Variables
- `PORT`: `4000` (hoặc port mà EasyPanel cung cấp, mặc định là 4000)

### Ưu điểm
- ✅ Kiểm soát hoàn toàn quá trình build
- ✅ Multi-stage build giúp image nhỏ gọn
- ✅ Tránh các lỗi dependency conflict
- ✅ Dễ debug và maintain

### Cấu trúc Dockerfile
- **Stage 1 (builder)**: Install dependencies và build app
- **Stage 2 (production)**: Chỉ copy build files và serve

---

## Phương pháp 2: Nixpacks

### Cấu hình Build trên EasyPanel

### 1. Build Method
Chọn: **Nixpacks**
- Nixpacks tự động detect React app và cấu hình phù hợp

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

### Dockerfile (Khuyến nghị)
```
Build Method: Dockerfile
Dockerfile Path: Dockerfile
Docker Context: .
Port: 4000
Environment Variables:
  - PORT: 4000
```

### Nixpacks
```
Build Method: Nixpacks
Version: 1.34.1
Install Command: npm install --legacy-peer-deps
Build Command: npm run build
Start Command: npm run serve
Nix Packages: (để trống)
APT Packages: (để trống)
```

### Buildpacks
```
Build Method: Buildpacks
Install Command: npm install --legacy-peer-deps
Build Command: npm run build
Start Command: npm run serve
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
**Giải pháp tốt nhất**: Chuyển sang **Dockerfile** (Phương pháp 1)

Hoặc thử chuyển sang **Buildpacks**:
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

## Test Dockerfile locally

Để test Dockerfile trước khi deploy:

```bash
# Build image
docker build -t lofi-app .

# Run container
docker run -p 4000:4000 -e PORT=4000 lofi-app

# Hoặc với port khác
docker run -p 8080:8080 -e PORT=8080 lofi-app
```

Sau đó truy cập `http://localhost:4000` để kiểm tra.

## Kiểm tra sau khi deploy

1. Đảm bảo build thành công (không có lỗi)
2. Kiểm tra thư mục `build/` có được tạo ra
3. Verify static files được serve đúng
4. Kiểm tra console logs để đảm bảo app chạy đúng port

