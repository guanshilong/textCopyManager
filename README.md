# 文本快捷复制插件

## ✨ 功能特性

✅ **便利贴风格UI**  
- 拟物化纸张纹理背景  
- 三色卡通孔洞设计（红/蓝/绿）  
- 动态阴影和微倾斜悬停效果  

🔄 **智能交互机制**  
- 悬停显示隐藏操作按钮  
- 流畅的折叠式输入框  
- 气泡通知动画（2秒自动消失）

## 🛠 安装指南

1. 下载项目代码  
`git clone https://github.com/your-repo/text-copy-manager.git`

2. 打开Chrome浏览器  
地址栏输入 `chrome://extensions`

3. 开启开发者模式  
✅ 右上角打开"开发者模式"开关

4. 加载插件  
点击"加载已解压的扩展程序" → 选择本插件目录

## 🖥 使用说明

📝 **添加文本**  
点击右下角➕按钮展开输入框 → 输入常用文本 → 点击添加

📋 **快速复制**  
直接点击文本内容即可自动复制到剪贴板  
✅ 成功时显示绿色气泡通知

🗑 **删除条目**  
悬停文本 → 点击右侧🗑图标 → 立即移除

![image](https://github.com/user-attachments/assets/c8f8e858-853f-4987-ab95-29df9d208c11)


## ⚙ 配置说明
```json
{
  "permissions": ["storage", "clipboardWrite"],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon16.png",
    "128": "icons/icon16.png"
  }
}
```

## 📌 注意事项

⚠ 数据存储使用chrome.storage.local  
⚠ 需要启用clipboardWrite权限  
⚠ 建议Chrome 88+版本使用

## ❓ 常见问题

Q: 数据存储在哪里？  
A: 使用浏览器本地存储，重装插件会保留数据

Q: 如何备份配置？  
A: 导出`chrome.storage.local`中的textList数据

Q: 为什么需要clipboard权限？  
A: 用于实现一键复制文本到剪贴板功能
