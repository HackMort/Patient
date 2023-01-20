// Symptoms Toggle JS
document.addEventListener('DOMContentLoaded', function () {
  const symptomButtons = document.querySelectorAll('.nmosd__buttons .button');
  symptomButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveSymptoms(button);
    });
  });
  function setActiveSymptoms(button) {
    symptomButtons.forEach((button) => {
      button.parentNode.classList.remove('active');
    });
    button.parentNode.classList.add('active');
    toggleSymptoms(button.id);
  }

  function toggleSymptoms(buttonId = 'nmosd_symptoms') {
    const symptoms = document.querySelectorAll('.nmosd__symptoms_item');
    const circleSpan = document.querySelector('.nmosd__symptoms_item--cirle span');
    symptoms.forEach((symptom) => {
      symptom.classList.remove('active');
      if (symptom.classList.contains(buttonId)) {
        symptom.classList.add('active');
        circleSpan.innerHTML = 'MS';
      }
      else if (buttonId === 'nmosd_symptoms') {
        symptom.classList.add('active');
        circleSpan.innerHTML = 'NMOSD';
      }
    });
  }

  window.addEventListener('scroll', () => {
    stickySymptomButtons();
  });
  window.addEventListener('resize', () => {
    stickySymptomButtons();
  });

  function stickySymptomButtons() {
    const mobileMedia = window.matchMedia('(max-width: 767px)');
    const nmosdButtons = document.querySelector('.nmosd__buttons');
    const nmosSymptomsContainer = document.querySelector('.nmosd__symptoms');
    const nmosSymptomsContainerHeight = nmosSymptomsContainer.offsetHeight;
    const scrollPosition = window.scrollY;
    const nmosSymptomsContainerOffset = nmosSymptomsContainer.offsetTop;
    const nmosSymptomsContainerOffsetBottom = nmosSymptomsContainerOffset + nmosSymptomsContainerHeight;
    const nmosSymptomsContainerOffsetTop = nmosSymptomsContainerOffset;
    if (mobileMedia.matches) {
      if (scrollPosition >= nmosSymptomsContainerOffsetTop && scrollPosition <= nmosSymptomsContainerOffsetBottom) {
        nmosdButtons.classList.add('sticky');
        const nmosd__symptoms_offset = document.querySelector('.nmosd__symptoms').offsetTop;
        const stickyButtons = document.querySelectorAll('.nmosd__buttons.sticky .button');
        // stickyButtons.forEach((button) => {
        //   button.addEventListener('click', () => {
        //     // window.scrollTo({
        //     //   top: nmosd__symptoms_offset - 100,
        //     //   behavior: 'smooth'
        //     // });
        //   });
        // });
      }
      else {
        nmosdButtons.classList.remove('sticky');
      }
    }
  }
});

