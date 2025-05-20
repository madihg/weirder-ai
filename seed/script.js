// Function to open a URL in a random popup window
function openUrlWindow(url, title) {
  const winWidth = 800;
  const winHeight = 600;
  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const left = Math.floor(Math.random() * (screenW - winWidth));
  const top = Math.floor(Math.random() * (screenH - winHeight));
  window.open(url, title, `width=${winWidth},height=${winHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`);
}

// Function to open an image in a random popup window
function openImageWindow(imgSrc, title) {
  const winWidth = 400;
  const winHeight = 400;
  const screenW = window.screen.width;
  const screenH = window.screen.height;
  const left = Math.floor(Math.random() * (screenW - winWidth));
  const top = Math.floor(Math.random() * (screenH - winHeight));
  const win = window.open('', '_blank', `width=${winWidth},height=${winHeight},left=${left},top=${top},resizable=yes`);
  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { margin: 0; padding: 0; width: 100%; height: 100vh; overflow: hidden; background: white; cursor: pointer; }
          img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
        </style>
      </head>
      <body>
        <img src="${imgSrc}" alt="${title}">
      </body>
    </html>
  `);
  win.document.close();
}

// Function to position blocks randomly across the page
function positionBlocks() {
  const blocks = document.querySelectorAll('.block');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  // Set minimum vertical spacing between blocks
  let currentTop = 50;
  
  blocks.forEach((block, index) => {
    // Calculate random left position (between 10% and 80% of window width)
    const randomLeft = Math.floor(Math.random() * (windowWidth * 0.7)) + (windowWidth * 0.1);
    
    // Set the positions
    block.style.left = randomLeft + 'px';
    block.style.top = currentTop + 'px';
    
    // Increase vertical position for next block (with some randomness)
    currentTop += block.offsetHeight + Math.floor(Math.random() * 50) + 30;
  });
  
  // Set minimum document height to ensure all blocks are visible
  document.body.style.minHeight = (currentTop + 100) + 'px';
}

// Position blocks when the page loads
window.addEventListener('load', positionBlocks);

// Reposition blocks when window is resized
window.addEventListener('resize', positionBlocks);

// Block 1 input logic
const block1Input = document.getElementById('block1input');
const slashButton1 = document.getElementById('slashButton1');

block1Input.addEventListener('input', () => {
  slashButton1.style.display = block1Input.value.includes('|') ? 'inline-block' : 'none';
});

slashButton1.addEventListener('click', () => {
  openUrlWindow('https://www.google.com/search?q=ai+news&rlz=1C5CHFA_enUS1097US1097&oq=ai+news+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhB0gEIMTY4MWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8', 'AI News');
});

// Block 2 slider and slash buttons logic
const block2Slider = document.getElementById('block2slider');
const slashButton2 = document.getElementById('slashButton2');
let sliderPhase = 0;
let secondSlashButton = null;

block2Slider.addEventListener('input', () => {
  if (sliderPhase === 0 && parseInt(block2Slider.value) === 100) {
    slashButton2.style.display = 'inline-block';
  } 
  else if (sliderPhase === 0 && slashButton2.style.display === 'inline-block' && parseInt(block2Slider.value) === 0) {
    sliderPhase = 1;
    secondSlashButton = document.createElement('button');
    secondSlashButton.textContent = '/';
    secondSlashButton.className = 'slash-button';
    secondSlashButton.style.marginTop = '10px';
    document.getElementById('block2').appendChild(secondSlashButton);
    secondSlashButton.addEventListener('click', () => {
      openUrlWindow('https://johnnosta.medium.com/the-most-important-chart-in-100-years-1095915e1605', 'GPT Adoption');
    });
  }
});

slashButton2.addEventListener('click', () => {
  openUrlWindow('https://www.economist.com/weeklyedition/2010-02-27', 'Economist');
});

// Block 3 select logic
const block3Select = document.getElementById('block3select');

block3Select.addEventListener('change', () => {
  if (block3Select.value === '|') {
    openImageWindow('assets/babylon.png', 'Babylon');
    openImageWindow('assets/babylon2.png', 'Babylon 2');
  }
});

// Block 4 story link logic
const storyLink = document.getElementById('storyLink');

storyLink.addEventListener('click', (e) => {
  e.preventDefault();
  openImageWindow('assets/iching.png', 'I Ching');
  openImageWindow('assets/iching2.png', 'I Ching 2');
});

// Block 5 input logic
const block5Input = document.getElementById('block5input');
const trustButton = document.getElementById('trustButton');

block5Input.addEventListener('input', () => {
  trustButton.style.display = block5Input.value.toLowerCase() === 'i can' ? 'block' : 'none';
});

trustButton.addEventListener('click', () => {
  openImageWindow('assets/sepher.png', 'Sepher');
  openImageWindow('assets/sepher2.png', 'Sepher 2');
  openUrlWindow('assets/baghdad.png', 'Baghdad');
});

// Block 6 checkbox grid logic
const checkboxes = document.querySelectorAll('#block6 input[type="checkbox"]');
const attentionButton = document.getElementById('attentionButton');
attentionButton.textContent = 'open';

function checkDiagonal() {
  const diagonal = [
    document.getElementById('check2').checked,
    document.getElementById('check5').checked,
    document.getElementById('check8').checked
  ];
  attentionButton.style.display = diagonal.every(checked => checked) ? 'block' : 'none';
}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', checkDiagonal);
});

attentionButton.addEventListener('click', () => {
  openUrlWindow('https://arxiv.org/abs/1706.03762', 'arXiv');
});

// Block 7 button - Open journey map link in popup
document.getElementById('block7button').addEventListener('click', () => {
  window.open('https://map-your-journey-2.glitch.me/', '_blank', 'width=800,height=600,scrollbars=yes');
});

// Block 8 checkbox logic
const slashCheckbox = document.getElementById('slashCheckbox');
const block8Button = document.getElementById('block8-button');

slashCheckbox.addEventListener('change', () => {
  block8Button.style.display = slashCheckbox.checked ? 'block' : 'none';
});

block8Button.addEventListener('click', () => {
  window.open('towers.html', '_blank', 'width=800,height=600,scrollbars=yes');
});

// Block 9 toggle switches logic
const toggleSwitches = document.querySelectorAll('.toggle-switch');
const block9SlashButton = document.getElementById('block9-slash-button');

function checkToggleCount() {
  const toggledCount = Array.from(toggleSwitches).filter(toggle => toggle.checked).length;
  block9SlashButton.style.display = toggledCount >= 3 ? 'block' : 'none';
}

// Add change event to all toggle switches
toggleSwitches.forEach(toggle => {
  toggle.addEventListener('change', checkToggleCount);
});

// Slash button click handler
block9SlashButton.addEventListener('click', () => {
  window.open('here-there.html', '_blank', 'width=800,height=600,scrollbars=yes');
});

// Block 10 symbol buttons logic
const verticalBarButton = document.getElementById('vertical-bar-button');
const ricardoSemlerModal = document.getElementById('ricardoSemlerModal');
const closeRicardoSemler = document.getElementById('closeRicardoSemler');

verticalBarButton.addEventListener('click', () => {
  ricardoSemlerModal.style.display = 'block';
});

closeRicardoSemler.addEventListener('click', () => {
  ricardoSemlerModal.style.display = 'none';
});

// Block 11 date picker logic
const block11Date = document.getElementById('block11date');
const block11VerticalButton = document.getElementById('block11-vertical-button');
const block11Words = document.getElementById('block11-words');

block11Date.addEventListener('change', () => {
    block11VerticalButton.style.display = block11Date.value ? 'block' : 'none';
    block11Words.style.display = block11Date.value ? 'block' : 'none';
});

block11VerticalButton.addEventListener('click', () => {
  // Exact positions as specified (same as grandpa images)
  openImageWindow('assets/philo1.jpg', 'Philo 1');
  openImageWindow('assets/philo2.jpg', 'Philo 2');
  openImageWindow('assets/philo3.jpg', 'Philo 3');
  openImageWindow('assets/philo4.jpg', 'Philo 4');
});

// Block 12 circle animation and modal
const circleButton = document.getElementById('circle-button');
const circlesContainer = document.getElementById('circles-container');
const waterModal = document.getElementById('waterModal');
const closeWater = document.getElementById('closeWater');

circleButton.addEventListener('click', () => {
    // Create multiple expanding circles
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'expanding-circle';
        circle.style.left = '50%';
        circle.style.top = '50%';
        circle.style.animationDelay = `${i * 0.2}s`;
        circlesContainer.appendChild(circle);
        
        // Remove circle after animation
        setTimeout(() => {
            circle.remove();
        }, 2000 + (i * 200));
    }
    
    // Show water gif modal after 5 seconds
    setTimeout(() => {
        waterModal.style.display = 'flex';
    }, 5000);
});

closeWater.addEventListener('click', () => {
    waterModal.style.display = 'none';
});