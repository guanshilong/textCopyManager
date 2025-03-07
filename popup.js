// 初始化加载存储的文本
chrome.storage.local.get('textList', ({ textList }) => {
  renderList(textList || []);
});

// 添加按钮点击事件
// 输入框展开/折叠控制
const inputTrigger = document.createElement('button');
inputTrigger.className = 'input-trigger';
inputTrigger.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>`;

const inputWrapper = document.createElement('div');
inputWrapper.className = 'input-wrapper';
inputWrapper.append(document.getElementById('textInput'), document.getElementById('addBtn'));

document.querySelector('.input-group').prepend(inputTrigger, inputWrapper);

inputTrigger.addEventListener('click', () => {
  inputWrapper.classList.toggle('visible');
  inputTrigger.querySelector('svg').style.transform = inputWrapper.classList.contains('visible') ? 'rotate(135deg)' : 'none';
});

document.getElementById('addBtn').addEventListener('click', async () => {
  const input = document.getElementById('textInput');
  const text = input.value.trim();
  
  if (text) {
    const { textList = [] } = await chrome.storage.local.get('textList');
    if (textList.includes(text)) {
      showNotification('内容已存在！');
      return;
    }
    const updatedList = [...textList, text];
    await chrome.storage.local.set({ textList: updatedList });
    renderList(updatedList);
    input.value = '';
  }
});

// 渲染文本列表函数
function renderList(list) {
  const listEl = document.getElementById('textList');
  listEl.innerHTML = '';

  list.forEach((text, index) => {
    const li = document.createElement('li');
    li.className = 'list-item';
    
    // 文本内容（点击复制）
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.style.cursor = 'pointer';
    textSpan.onclick = () => copyText(text);

    // 操作按钮容器
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'item-actions';

    // 删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = `<svg width="12" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 7v14h14V7H5zm3 3h1v8H8v-8zm3 0h1v8h-1v-8zm3 0h1v8h-1v-8zM15 4v2H9V4h6z" stroke="currentColor" stroke-width="1"/>`;
    deleteBtn.onclick = async () => {
      const { textList = [] } = await chrome.storage.local.get('textList');
      const updatedList = textList.filter((_, i) => i !== index);
      await chrome.storage.local.set({ textList: updatedList });
      renderList(updatedList);
    };

    actionsDiv.append(deleteBtn);
    li.append(textSpan, actionsDiv);
    listEl.appendChild(li);
  });
}

// 复制文本到剪贴板
// 显示通知
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('复制成功！');
  }).catch(err => {
    console.error('复制失败:', err);
  });
}