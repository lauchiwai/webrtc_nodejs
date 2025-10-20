# WebRTC Node.js Server for Video Conversion and Real-time Communication

A Node.js-based server providing real-time communication (WebRTC signaling exchange) and video conversion services.

## Main Features

### Video Conversion Service

- Receive WebM format video files
- Convert to MP4 format using FFmpeg
- Provide converted file downloads

### Real-time Communication Service

- WebRTC-based room management
- Signaling exchange functionality:
  - Offer/Answer exchange
  - ICE candidate transmission
  - Real-time connection status management

## Technology Stack

- Node.js
- Express
- Socket.io
- FFmpeg
- CORS

## Environment Requirements

- Node.js v14+
- FFmpeg
- npm package manager

## Quick Start

```bash
npm install
node server.js
