let socket;

if (localStorage.getItem('socketId')) {
  socket = io(`/?socketId=${localStorage.getItem('socketId')}`);
} else {
  socket = io();
  socket.on('connect', () => {
    localStorage.setItem('socketId', socket.id);
  });
}

fetch('/api/codeblocks')
  .then(response => response.json())
  .then(codeBlocks => {
    const codeBlockList = document.getElementById('codeBlockList');
    codeBlockList.innerHTML='';
    codeBlocks.forEach(codeBlock => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `/codeblock.html?title=${codeBlock.title}`;
      a.textContent = codeBlock.title;
      li.appendChild(a);
      codeBlockList.appendChild(li);
    });
  })
  .catch(error => console.error('Error:', error));
