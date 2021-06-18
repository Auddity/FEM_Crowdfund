const body = document.getElementById('body');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navItems = document.querySelectorAll('.nav-item');
const bookmarkEl = document.getElementById('bookmark');
const backProjectBtn = document.getElementById('back-project-btn');
const closeModalBtn = document.getElementById('close-modal');
const backProjectModal = document.getElementById('back-project-modal');
const discoverLink = document.getElementById('discover');
const getStartedLink = document.getElementById('get-started');

// FUNCTIONS ************************
// Open & Close Mobile Menu Modal Function
const openMenu = () => {
  if(!backProjectModal.classList.contains('hide') || !successModal.classList.contains('hide')) {
    hamburger.addEventListener('click', () => {
      return null;
    });
  } else {
    modalBg();
    navMenu.classList.toggle('nav-modal');
    navMenu.classList.toggle('nav');
    hamburger.firstElementChild.classList.toggle('hide');
    hamburger.lastElementChild.classList.toggle('hide');
  };
};

const closeMenu = () => {
  modalBg();
  navMenu.classList.toggle('nav-modal');
  navMenu.classList.toggle('nav');
  hamburger.firstElementChild.classList.toggle('hide');
  hamburger.lastElementChild.classList.toggle('hide');
};

// Close Modal Element if Nav Link is clicked
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if(navMenu.classList.contains('nav-modal')) {
      closeMenu();
    };
    if(!backProjectModal.classList.contains('hide')) {
      closeModalEl();
    };
  });
});

// Open and Close the main Back Project Modal
const openBackProjectModal = () => {
  modalBg();
  backProjectModal.classList.remove('hide');
};

const closeModalEl = () => {
  modalBg();
  uncheckRadio();
  hideDropdown();
  removeBorder();
  backProjectModal.classList.add('hide');
};

// Toggle Modal Background Function
const modalBg = () => {
  body.classList.toggle('modal-bg');
};

// Toggle Bookmark Text color
const toggleBookmarkColors = () => {
  let circle = document.getElementById('circle');
  let fillColor = circle.getAttribute('fill');
  let path = document.getElementById('path');
  let pathColor = path.getAttribute('fill');

  fillColor === 'hsl(176, 72%, 28%)'
    ? circle.setAttribute('fill', '#2F2F2F') 
    : circle.setAttribute('fill', 'hsl(176, 72%, 28%)');

  pathColor === 'hsl(0, 0%, 95%)'
    ? path.setAttribute('fill', '#b1b1b1')
    : path.setAttribute('fill', 'hsl(0, 0%, 95%)');

  bookmarkEl.lastElementChild.classList.toggle('text-color');
};

// Open Back Project Modal from Main Body Card Buttons with correct Pledge Selected
const mainBodyCardBtns = document.querySelectorAll('.card-btn');
mainBodyCardBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    openBackProjectModal();
    radios[idx + 1].setAttribute('checked', 'true');
    pledgeDropdowns[idx + 1].classList.remove('hide');
    modalCards[idx + 1].classList.add('selected-border');
  });
});

// Cards in Back project Modal functionality (Radio)
const modalCards = document.querySelectorAll('.modal-card')
const selectPledges = document.querySelectorAll('.pledge-select');
const radios = document.querySelectorAll('input[type=radio]');
const pledgeDropdowns = document.querySelectorAll('.card-pledge-container');

selectPledges.forEach((pledge, idx) => {
  pledge.addEventListener('click', () => {
    uncheckRadio();
    hideDropdown();
    removeBorder();
    radios[idx].setAttribute('checked', 'true');
    pledgeDropdowns[idx].classList.remove('hide');
    modalCards[idx].classList.add('selected-border');
  });
});

const hideDropdown = () => {
  pledgeDropdowns.forEach(dropDown => {
    dropDown.classList.add('hide');
  });
};

const uncheckRadio = () => {
  radios.forEach(radio => {
    radio.removeAttribute('checked');
  });
};

const removeBorder = () => {
  modalCards.forEach(card => {
    card.classList.remove('selected-border');
  });
};

// Updating Stats upon pledge submission
const dollarsEl =  document.getElementById('dollars');
const backersEl = document.getElementById('backers');
const daysLeftEl = document.getElementById('days-remaining');
const pledgeInputs = document.querySelectorAll('input[type="text"]');
let dollars = 89914;
let backers = 5007;

const updateDollarsBackers = () => {
  for(let input of pledgeInputs) {
    updateStatusBar(input.value);
    dollarsEl.innerText = `$${(dollars += +input.value).toLocaleString('en-US')}`;
    input.value = '';
  };

  dollars !== 89914 ? backers++ : backers;
  backersEl.innerText = (backers).toLocaleString('en-US');
};

// Set & Update status bar
const statusBarFill = document.getElementById('stats-bar-fill');
let goal = 100000;
let barWidth = Math.round((dollars / goal) * 100);
statusBarFill.style.width = `${barWidth}%`;

const updateStatusBar = (amount) => {
  let barWidth = Math.round(((dollars + amount) / goal) * 100);
  statusBarFill.style.width = `${barWidth}%`
};

// Submit Pledge Button Functionality (Continue buttons on modalCards)
const continueBtns = document.querySelectorAll('.continue-btn');
continueBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    openSuccess();
    updateDollarsBackers();
  });
});

// Open & Close Success Modal
const successModal = document.getElementById('success-modal');
const gotItBtn = document.getElementById('got-it-btn');

const openSuccess = () => {
  closeModalEl();
  modalBg();
  successModal.classList.remove('hide');
};

const closeSuccess = () => {
  modalBg();
  successModal.classList.add('hide');
};

// GENERAL EVENT LISTENERS ************************
hamburger.addEventListener('click', openMenu);
bookmarkEl.addEventListener('click', toggleBookmarkColors);
backProjectBtn.addEventListener('click', openBackProjectModal);
closeModalBtn.addEventListener('click', closeModalEl);
gotItBtn.addEventListener('click', closeSuccess);
getStartedLink.addEventListener('click', openBackProjectModal);