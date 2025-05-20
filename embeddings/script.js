let font;
let letterGroups = []; 
let svgGroups = [];   
let currentGroups = []; 
let targetGroups = [];
let isHovering = false;
const letters = "cavity!".split("");
let noiseOffset = 0;

const svgPath = "M18.5 11C18.5 3 13.5858 7.35786 13 1.5C17.491 4.81946 20.9999 8 25 10C29 12 39.5 5.5 39.5 5.5C39.5 5.5 30.8066 13.5 33.8066 13C36.8066 12.5 40.8066 21.5 40.8066 21.5C39 18.0038 28.1863 14.791 27 17C23.6918 21.783 32.8362 25.4225 35.3066 30L33.8066 41.5C33.118 27.5 25.3665 24.3834 19.5 22.5C12.4184 27.4494 10.5 30 8.30656 41.5C3.49999 31 15.2645 27.2176 15.5 19.5L0.306641 22.5C0.306641 22.5 18.5 19 18.5 11Z";

fontlink = 'cavity.otf';

const div1 = document.getElementById("div1");
const caption = document.getElementById("caption");

function parseSVGPath(pathData, numPoints = 100) {
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = `<svg><path d="${pathData}"/></svg>`;
  let path = tempDiv.querySelector('path');
  let points = [];
  
  let length = path.getTotalLength();
  
  for (let i = 0; i < numPoints; i++) {
    let point = path.getPointAtLength(i * length / numPoints);
    points.push({
      x: point.x,
      y: point.y
    });
  }
  
  return points;
}

// Function for first canvas
function sketch1(p) {
  p.preload = function () {
    font = p.loadFont(fontlink);
  };

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight, canvas1);

    let fontSize = window.innerWidth * 0.2; 
    fontSize = p.constrain(fontSize, 100, 220);
    let textWidth = font.textBounds(letters.join(""), 0, 0, fontSize).w;
    
    let xOffset = window.innerWidth / 2 - textWidth / 2;
    let yOffset = window.innerHeight / 2;

    letters.forEach(letter => {
      let points = font.textToPoints(letter, xOffset, yOffset, fontSize, {
        sampleFactor: 0.5,
        simplifyThreshold: 0,
      });
    
      let letterWidth = font.textBounds(letter, xOffset, yOffset, fontSize).w;
      xOffset += letterWidth + fontSize * 0.05; 
    
      if (points.length > 0) {
        letterGroups.push(points);
    
        let svgPoints = parseSVGPath(svgPath, points.length);
        let scaleFactor = window.innerWidth / 200;
        
        let [minX, maxX, minY, maxY] = [
          Math.min(...svgPoints.map(p => p.x)),
          Math.max(...svgPoints.map(p => p.x)),
          Math.min(...svgPoints.map(p => p.y)),
          Math.max(...svgPoints.map(p => p.y))
        ];
    
        let [svgWidth, svgHeight] = [maxX - minX, maxY - minY];
        let [svgOffsetX, svgOffsetY] = [
          window.innerWidth / 2 - svgWidth * scaleFactor / 2,
          window.innerHeight / 2 - svgHeight * scaleFactor / 1.5
        ];
    
        svgGroups.push(svgPoints.map(pt => ({
          x: pt.x * scaleFactor + svgOffsetX,
          y: pt.y * scaleFactor + svgOffsetY,
        })));
    
        currentGroups.push(points.map(pt => ({ x: pt.x, y: pt.y })));
        targetGroups.push(points.map(pt => ({ x: pt.x, y: pt.y })));
      }
    });
    caption.style.display = "block";
  };

  p.draw = function () {
    p.clear();

    const bounds1 = window.innerWidth * 3/8;
    const bounds2 = window.innerWidth * 5/8;
    const bounds3 = window.innerHeight * 3/8;
    const bounds4 = window.innerHeight * 5/8;

    if (p.mouseX >= bounds1 && p.mouseX <= bounds2 && p.mouseY >= bounds3 && p.mouseY <= bounds4) {
      if (!isHovering) {
        isHovering = true;
        targetGroups = svgGroups;
      }
    } else {
      if (isHovering) {
        isHovering = false;
        targetGroups = letterGroups;
      }
    }

    for (let g = 0; g < currentGroups.length; g++) {
      for (let i = 0; i < currentGroups[g].length; i++) {
        currentGroups[g][i].x = p.lerp(currentGroups[g][i].x, targetGroups[g][i].x, 0.1);
        currentGroups[g][i].y = p.lerp(currentGroups[g][i].y, targetGroups[g][i].y, 0.1);

        let noiseVal = p.noise(currentGroups[g][i].x * 0.1, currentGroups[g][i].y * 0.1, noiseOffset);
        currentGroups[g][i].x += p.map(noiseVal, 0, 1, -1, 1);
        currentGroups[g][i].y += p.map(noiseVal, 0, 1, -1, 1);
      }

      p.fill(0);
      p.noStroke();
      p.beginShape();
      for (let pos of currentGroups[g]) {
        p.vertex(pos.x, pos.y);
      }
      p.endShape(p.CLOSE);
    }

    noiseOffset += 0.01;
  };
}
  
// Run first p5 instance
new p5(sketch1);

let elements = {};
let textBoxes = {}; 

let elementContent = {
  first: [
    { type: 'image', content: 'assets/matts-picture.png' }
  ],
  second: [
    { type: 'image', content: 'assets/matts-picture2.png' }
  ],
  third: [
    { type: 'image', content: 'assets/beer-ostrich.png' }
  ],
  fourth: [
    { type: 'text', content: "what if it's right?" }
  ],
  fifth: [
    { type: 'image', content: 'assets/2synths.png' }
  ],
  sixth: [
    { type: 'image', content: 'assets/gpt-pic.png' }
  ],
  seventh: [
    { type: 'image', content: 'assets/monster-meme.png' }
  ],
  eighth: [
    { type: 'image', content: 'assets/monster-meme2.png' }
  ],
  ninth: [
    { type: 'text', content: "breaking high dimensional horses" }
  ],
  tenth: [
    { type: 'image', content: 'assets/about-me.png' }
  ],
  eleventh: [
    { type: 'image', content: 'assets/about-me2.png' }
  ],
  twelfth: [
    { type: 'image', content: 'assets/invisible.png' }
  ],
  thirteenth: [
    { type: 'image', content: 'assets/monster-meme3.png' }
  ],
  fourteenth: [
    { type: 'image', content: 'assets/kristeva.jpg' }
  ],
  fifteenth: [
    { type: 'image', content: 'assets/shapeshifter.png' }
  ],
  sixteenth: [
    { type: 'link', content: 'https://future-v-chameleon.glitch.me/' }
  ]
};

let connections = [
  ['first', 'second'],
  ['second', 'third'],
  ['third', 'fourth'],
  ['fourth', 'fifth'],
  ['fifth', 'sixth'],
  ['sixth', 'seventh'],
  ['seventh', 'eighth'],
  ['eighth', 'ninth'],
  ['ninth', 'tenth'],
  ['tenth', 'eleventh'],
  ['eleventh', 'twelfth'],
  ['twelfth', 'thirteenth'],
  ['thirteenth', 'fourteenth'],
  ['fourteenth', 'fifteenth'],
  ['fifteenth', 'sixteenth']
];

// Function for second canvas
function sketch2(p) {
  let scaleFactor = 1;
    if (window.innerWidth < 500) {
      scaleFactor = 0.75;
    }

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight, canvas2);

    let vars = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth'];

    // Calculate positions in a grid-like pattern
    let cols = 4;
    let rows = 4;
    let cellWidth = window.innerWidth / cols;
    let cellHeight = window.innerHeight / rows;

    for (let i = 0; i < vars.length; i++) {
      let row = Math.floor(i / cols);
      let col = i % cols;

      // Add some padding and randomness within the cell
      let randomX = col * cellWidth + p.random(20 * scaleFactor, cellWidth - 100 * scaleFactor);
      let randomY = row * cellHeight + p.random(20 * scaleFactor, cellHeight - 50 * scaleFactor);

      let element = p.createDiv(vars[i]);
      element.position(randomX, randomY);

      element.size(100 * scaleFactor, 21 * scaleFactor);
      element.style('background', 'black');
      element.style('padding-left', `${10 * scaleFactor}px`);
      element.style('font-size', `${13 * scaleFactor}px`);
      element.style('-webkit-touch-callout', 'none');
      element.style('-webkit-user-select', 'none');
      element.style('-khtml-user-select', 'none');
      element.style('-moz-user-select', 'none');  
      element.style('-ms-user-select', 'none');
      element.style('user-select', 'none');
      element.style('white-space', 'nowrap');
      element.draggable();

      zindex = 1;
      function createTextBox(elementName, sourceElement) {
        if (textBoxes[elementName]) {
          textBoxes[elementName].remove();
          delete textBoxes[elementName];
        }

        let textBox = p.createDiv();
        let pos = sourceElement.position();

        textBox.position(pos.x + sourceElement.width + 15 * scaleFactor, pos.y);

        textBox.style('background', 'white');
        textBox.style('border', '1px solid black');
        textBox.style('padding', `${10 * scaleFactor}px`);
        textBox.style('min-width', `${500 * scaleFactor}px`);
        textBox.style('box-shadow', `${2 * scaleFactor}px ${2 * scaleFactor}px ${5 * scaleFactor}px rgba(0,0,0,0.2)`);
        textBox.style('-webkit-touch-callout', 'none');
        textBox.style('-webkit-user-select', 'none');
        textBox.style('-khtml-user-select', 'none');
        textBox.style('-moz-user-select', 'none');
        textBox.style('-ms-user-select', 'none');
        textBox.style('user-select', 'none');
        textBox.style('font-size', `${13 * scaleFactor}px`);
        textBox.style('z-index', zindex);
        textBox.draggable();
        zindex++;

        let closeBtn = p.createButton('×');
        closeBtn.parent(textBox);
        closeBtn.style('float', 'right');
        closeBtn.style('border', 'none');
        closeBtn.style('background', 'none');
        closeBtn.style('font-size', `${20 * scaleFactor}px`);
        closeBtn.style('cursor', 'pointer');
        closeBtn.style('color', 'black');
        closeBtn.style('margin', '0px');
        closeBtn.style('padding', '0px');
        closeBtn.style('line-height', '1');
        closeBtn.style('font-family', 'Arial');
        closeBtn.mousePressed(function () {
          textBox.remove();
          delete textBoxes[elementName];
        });

        // Initialize or increment the content index for this element
        if (!sourceElement.contentIndex) {
          sourceElement.contentIndex = 0;
        }

        let content = elementContent[elementName][sourceElement.contentIndex];
        let contentDiv;

        if (content.type === 'text') {
          contentDiv = p.createDiv(content.content);
          contentDiv.style('width', '100%');
        } else if (content.type === 'image') {
          contentDiv = p.createImg(content.content);
          contentDiv.style('width', '100%');
          contentDiv.style('min-width', `${500 * scaleFactor}px`);
          contentDiv.style('height', 'auto');
          contentDiv.style('display', 'block');
        } else if (content.type === 'link') {
          contentDiv = p.createA(content.content, 'Open', '_blank');
          contentDiv.style('display', 'block');
          contentDiv.style('text-align', 'center');
          contentDiv.style('margin-top', `${20 * scaleFactor}px`);
          contentDiv.style('text-decoration', 'none');
          contentDiv.style('color', 'black');
          contentDiv.style('padding', `${5 * scaleFactor}px`);
          contentDiv.style('border', '1px solid black');
        }

        contentDiv.parent(textBox);
        contentDiv.style('margin-top', `${20 * scaleFactor}px`);

        textBoxes[elementName] = textBox;

        textBox.mousePressed(function () {
          textBox.style('z-index', zindex);
          zindex++;
        });

        // Increment the content index for next click
        sourceElement.contentIndex = (sourceElement.contentIndex + 1) % elementContent[elementName].length;
      }

      element.mouseClicked(function () {
        createTextBox(vars[i], element);
        element.style('color', '#39FF00');
      });

      element.elt.addEventListener('drag', function (event) {
        let textBox = textBoxes[vars[i]];
        if (textBox) {
          let newPos = element.position();
          textBox.position(newPos.x + element.width() + 25, newPos.y);
        }
      });

      elements[vars[i]] = element;
    }
  };

  p.draw = function () {
    p.clear();

    p.strokeWeight(1.5);

    for (let connection of connections) {
      let elem1 = elements[connection[0]];
      let elem2 = elements[connection[1]];

      let x1 = elem1.position().x + elem1.width / 2;
      let y1 = elem1.position().y + elem1.height / 2;
      let x2 = elem2.position().x + elem2.width / 2;
      let y2 = elem2.position().y + elem2.height / 2;

      // Calculate the distance and angle between the two points
      let distance = p.dist(x1, y1, x2, y2);
      let angle = p.atan2(y2 - y1, x2 - x1);

      // Set pixel size
      let pixelSize = 5 * scaleFactor;

      // Draw "pixelated" line using rectangles
      for (let i = 0; i < distance; i += pixelSize) {
        let px = x1 + p.cos(angle) * i;
        let py = y1 + p.sin(angle) * i;

        // Draw a small square
        p.noStroke();
        p.fill(0);
        p.rect(px, py, pixelSize, pixelSize / 2);
      }
    }
  }
}

// Run second p5 instance
function handleFirstClick() {
  const infoContainer = document.getElementById("info-container");
  
  // Hide the first canvas and display the second
  div1.style.display = "none";

  new p5(sketch2);
  infoContainer.style.display = "flex";

  // Remove the event listener to prevent subsequent clicks from being handled
  document.body.removeEventListener("click", handleFirstClick);
}

document.body.addEventListener("click", handleFirstClick);

const infoButton = document.getElementById('info-button');
const infoContent = document.getElementById('info-content');
const closeBtn = document.getElementById('close');

// When the user clicks the info button, toggle the display of the content
infoButton.addEventListener('click', function() {
    // Toggle the 'show' class to animate the reveal of content
    infoContent.classList.toggle('show');
});

closeBtn.addEventListener('click', function() {
  infoContent.classList.toggle('show');
});

window.onload = function() {
  const initialWidth = window.innerWidth;
  const initialHeight = window.innerHeight;
  
  // Set the width of the container to the initial window width
  div1.style.width = `${initialWidth}px`;
  div1.style.height = `${initialHeight}px`;

  caption.style.width = `${initialWidth}px`;
  caption.style.top = `${initialHeight*.7}px`;
};