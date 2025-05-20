// Pop-up image in new window for the remaining blocks (11-15)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('reveal-button')) {
      const imgUrl = e.target.dataset.img;
      const isBlock13 = e.target.closest('#block13') !== null;
  
      // Calculate window dimensions
      const winWidth = isBlock13 ? 800 : 300;
      const winHeight = isBlock13 ? 600 : 300;
  
      // Calculate position
      const screenW = window.screen.width;
      const screenH = window.screen.height;
      const left = isBlock13 ? 
        Math.floor((screenW - winWidth) / 2) : // Center for Block 13
        Math.floor(Math.random() * (screenW - winWidth));
      const top = isBlock13 ?
        Math.floor((screenH - winHeight) / 2) : // Center for Block 13
        Math.floor(Math.random() * (screenH - winHeight));
  
      // Open popup window
      const win = window.open('', '_blank', 
        `width=${winWidth},height=${winHeight},left=${left},top=${top},resizable=yes`);
  
      const img = new Image();
      img.src = imgUrl;
  
      img.onload = () => {
        const maxWidth = isBlock13 ? 800 : 500;
        let width = img.width;
        let height = img.height;
  
        if (width > maxWidth) {
          const scale = maxWidth / width;
          width = maxWidth;
          height = Math.floor(height * scale);
        }
  
        // Write image into the window
        win.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Image View</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background: white;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <img src="${imgUrl}" alt="Block Image" />
            </body>
          </html>
        `);
        win.document.close();
      };
    }
  });

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

// Block 1 - Text input with slash button
const block1Input = document.getElementById('block1input');
const slashButton1 = document.getElementById('slashButton1');

block1Input.addEventListener('input', () => {
    if (block1Input.value.toLowerCase() === 'begin') {
        slashButton1.style.display = 'block';
    } else {
        slashButton1.style.display = 'none';
    }
});

slashButton1.addEventListener('click', () => {
    window.open('https://www.oulipo.xyz/Prophet-Talk/11-page3.html', '_blank');
});

// Block 2 - Slider with two slash buttons
const block2Slider = document.getElementById('block2slider');
const slashButton2 = document.getElementById('slashButton2');
const slashButton2_2 = document.getElementById('slashButton2_2');

block2Slider.addEventListener('input', () => {
    if (block2Slider.value === '50') {
        slashButton2.style.display = 'block';
    } else {
        slashButton2.style.display = 'none';
    }
});

slashButton2.addEventListener('click', () => {
    document.getElementById('aiNewsModal').style.display = 'flex';
    slashButton2_2.style.display = 'block';
    });

slashButton2_2.addEventListener('click', () => {
    document.getElementById('informationEconomistModal').style.display = 'flex';
});

// Block 3 - Select with slash button
const block3Select = document.getElementById('block3select');
const slashButton3 = document.getElementById('slashButton3');

block3Select.addEventListener('change', () => {
    if (block3Select.value === '/') {
        document.getElementById('gptAdoptionModal').style.display = 'flex';
  }
});

// Block 4 - Story link
const storyLink = document.getElementById('storyLink');

storyLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('babylonModal').style.display = 'flex';
});

// Block 5 - System input with trust button
const block5Input = document.getElementById('block5input');
const trustButton = document.getElementById('trustButton');

block5Input.addEventListener('input', () => {
    if (block5Input.value.toLowerCase() === 'trust') {
        trustButton.style.display = 'block';
    } else {
        trustButton.style.display = 'none';
    }
});

trustButton.addEventListener('click', () => {
    document.getElementById('chinaModal').style.display = 'flex';
});

// Block 6 - Checkbox grid with slash button
const checkboxes = document.querySelectorAll('.checkbox-grid input[type="checkbox"]');
const slashButton6 = document.getElementById('slashButton6');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checkedCount = document.querySelectorAll('.checkbox-grid input[type="checkbox"]:checked').length;
        if (checkedCount === 9) {
            slashButton6.style.display = 'block';
        } else {
            slashButton6.style.display = 'none';
        }
    });
});

slashButton6.addEventListener('click', () => {
    document.getElementById('attentionModal').style.display = 'flex';
});
  
// Modal close buttons
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.parentElement.style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal-container').forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
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
  openImageWindow('assets/philo1.jpg', 'Philo 1', 600, 100);
  openImageWindow('assets/philo2.jpg', 'Philo 2', 900, 100);
  openImageWindow('assets/philo3.jpg', 'Philo 3', 500, 475);
  openImageWindow('assets/philo4.jpg', 'Philo 4', 800, 475);
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