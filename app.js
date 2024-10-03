
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



  const textSpans = document.querySelectorAll('.interactive-text span');
  const effectRadius = 180; // Set the radius within which the effect occurs

  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;

    textSpans.forEach(span => {
      const { left, top, width, height } = span.getBoundingClientRect();
      const spanCenterX = left + width / 2;
      const spanCenterY = top + height / 2;

      const deltaX = clientX - spanCenterX;
      const deltaY = clientY - spanCenterY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < effectRadius) {  // Only apply effect if within the radius
        const maxMoveDistance = 10;  // Max movement for the letters
        const moveX = (deltaX / distance) * Math.min(effectRadius, maxMoveDistance);
        const moveY = (deltaY / distance) * Math.min(effectRadius, maxMoveDistance);

        span.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        span.style.transform = '';  // Reset position if outside the radius
      }
    });
  });

  document.addEventListener('mouseleave', () => {
    textSpans.forEach(span => {
      span.style.transform = ''; // Reset transform when the cursor leaves
    });
  });

