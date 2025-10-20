# 影片轉換與即時通訊伺服器

一個基於Node.js的伺服器，提供即時通訊（WebRTC信令交換）功能。

## 主要功能

### 影片轉換服務

- 接收WebM格式影片檔案
- 使用FFmpeg轉換為MP4格式
- 提供轉換後檔案下載

### 即時通訊服務

- 基於WebRTC的房間管理
- 信令交換功能：
  - Offer/Answer 交換
  - ICE候選傳輸
  - 即時連線狀態管理

## 技術棧

- Node.js
- Express
- Socket.io
- FFmpeg
- CORS

## 環境要求

- Node.js v14+
- FFmpeg
- npm 套件管理工具

## 快速開始

npm install
node server.js
