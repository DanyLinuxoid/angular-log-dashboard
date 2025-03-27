# Angular Log Dashboard 📊🔍

![newezgif-4df8765e6092d8](https://github.com/user-attachments/assets/ec1f5fbd-ea64-4f19-a52f-8d07e35ba8f6)


## Overview

Angular Log Dashboard is a lightweight, high-performance log visualization tool designed for efficient log filtering + log analysis. 
Built from real-world project requirement, this module offers a robust solution for handling and filtering large log datasets with ease.

## 🌟 Key Features

- **Fast & Lightweight**: Optimized for performance, capable of handling 1M+ log entries
- **Advanced Filtering**: Support for text, file, and pinned/unpinned message filtering
- **Responsive UI**: Utilizes Angular's CDK virtual scroll + vertical pagination for smooth rendering of large datasets

## 🔍 Filtering Capabilities

- **Text Search**: Filter logs by specific keywords
- **File-based Filtering**: Sort and view logs by file origin
- **Pinned Logs**: Highlight and persist important log entries

## 💡 Performance

- Tested with 1M+ log entries
- Minimal performance overhead
- Smooth scrolling and rendering

![cropezgif-43d68042340afd](https://github.com/user-attachments/assets/a34d06e4-a6fd-4939-b612-78d7f39a7eb7)


## 📦 How To Use
An application by itself is just plug-and-play and has only 2 steps:
1. Just configure url inside of an environment.ts and environment.prod.ts: ```apiUrl: 'http://localhost:23263/log-dashboard'```
2. Be sure to return data in an array format according to this interface:
```typescript
export interface LogBase {
  logName: string;    // Log file name
  content: string;    // Log content
  date: Date;         // Log timestamp
}
```

And that' it!
