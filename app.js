
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show')
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


const forest = document.getElementById("forest-zone");
let lastPlantTime = 0;
const plantInterval = 280;
const topPadding = 65; // trees only appear below this
const botPadding = 65; // trees only appear above this

const minScale = 0.5; // smallest tree at top
const maxScale = 1.2; // largest tree at bottom

// Gradient color settings
const minY = topPadding; // start of gradient
const maxY = forest.clientHeight - botPadding; // bottom of gradient
const topColor = [53, 50, 54]; // top color
const bottomColor = [30, 25, 31]; // bottom color

const maxTrees = 100; 

forest.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastPlantTime < plantInterval) return;
  lastPlantTime = now;

  const rect = forest.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (y < topPadding || y > forest.clientHeight - botPadding) return;

  // interpolate vertical position t
  const t = (y - minY) / (maxY - minY);

  // calculate tree color
  const treeColorArr = topColor.map((c, i) => Math.round(c + t * (bottomColor[i] - c)));
  const treeColor = `rgb(${treeColorArr.join(",")})`;

  // calculate tree scale
  const treeScale = minScale + t * (maxScale - minScale);

  // create tree
  const tree = document.createElement("div");
  tree.classList.add("tree");
  tree.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 16 24" fill="${treeColor}">
    <path d="M8 6L2 18H14L8 6Z" fill="${treeColor}"/>
    <path d="M8 2L2 11H14L8 2Z" fill="${treeColor}"/>
    <path d="M9 16H7V24H9V16Z" fill="${treeColor}"/>
  </svg>`;

  tree.style.left = `${x}px`;
  tree.style.top = `${y}px`;
  tree.style.transform = `scale(${treeScale})`;

  forest.appendChild(tree);

    // Remove oldest trees if we exceed maxTrees
  const currentTrees = forest.querySelectorAll(".tree");
  if (currentTrees.length > maxTrees) {
    const excess = currentTrees.length - maxTrees;
    for (let i = 0; i < excess; i++) {
      currentTrees[i].remove();
    }
  }
});


