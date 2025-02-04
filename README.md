Tomato Self-Discipline Clock 🍅⏰
![image](https://github.com/user-attachments/assets/d4aea15b-f7cb-4ea1-a489-b23d34564da5)
Table of Contents
• Features
• Tech Stack
• Installation
• Project Structure
• Development Notes
• Contributing

Features ✨
Core Functionality
• 🍅 6 customizable task categories (Work/Study/Think/Write/Sport/Read)
• ⏰ Interactive time slider (1-60 minutes) using slider component
• 🎨 Dynamic circular timer visualization with Canvas API
• 📁 File management system for memo storage
• 🏆 Achievement system with media recording (photo/video)
• ⚡ Real-time data binding between view and logic layers

Interactive Elements
javascript
// Canvas animation logic snippet
drawActive() {
  const angle = 1.5 + 2*(totalTime - remaining)/totalTime;
  ctx
.arc(centerX, centerY, radius, 1.5*Math.PI, angle*Math.PI);
}

Tech Stack 💻
Category                Technologies
Core Framework          WeChat Mini Program Native Development
Key Components          slider, canvas, image, flex layout
Main APIs               wx.createCanvasContext, wx.saveFile, wx.chooseVideo, wx.getSystemInfo
Dev Tools               WeChat DevTools v1.06+
Architecture            Event-driven model, Conditional Rendering (wx:if), WXML Data Binding

Installation 🚀
Prerequisites
• WeChat Developer Tools 
• Base Library >= 2.16.0
Quick Start
bash
1. git
 clone https://github.com/yourusername/tomato-clock.git
2. Open WeChat DevTools -> Import Project ->
 Select project directory
3. Configure AppID in app.json (Test account available for development)
￼
Project Structure 📂

tomato-clock/
├── app.json               # Global configuration
├── pages/
│   ├── index/             # Main timer interface
│   │   ├── index.js       # Core timer logic
│   │   ├── index.wxml     # Task selection UI
│   │   └── index.wxss     # Styling
│   ├── logs/              # Memo system
│   │   ├── logs.js        # File management
│   │   └── logs.json
│   ├── chengjiu/          # Achievement system
│   └── gy/                # About page
└── README.md              # This document

Development Notes 📝
Key Implementations
1. Smooth Canvas Animation
Achieved 60fps rendering using optimized interval control:
javascript
setInterval(() => {
  const progress = (remainingTime / totalTime) * 2π;
  drawProgressArc(progress);
}, 100);

2. File Management System
Implemented persistent storage with WeChat APIs:
javascript
wx.saveFile({
  tempFilePath
,
  success(res) {
    console
.log('File saved:', res.savedFilePath);
  }
});

3. Responsive Layout
Dynamic UI adaptation using rpx units and system metrics:
javascript
const systemInfo = wx.getSystemInfoSync();
const scaleRatio = 750 / systemInfo.windowWidth;

Challenges & Solutions
• TypeScript Migration
Initial issues with .ts files due to type declarations. Resolved by switching to .js while maintaining type safety through JSDoc comments.
• Canvas Performance
Optimized frequent redraws by implementing double buffering technique with hidden canvas.
