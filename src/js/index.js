window.onload = () => {
  const startingButton = document.querySelector('.starting-button');
  const infoContainer = document.querySelector('.info');
  const main = document.querySelector('MAIN');
  const hint = document.querySelector('.hint');
  const healthPoints = document.querySelector('.health-point-scale');
  const volumeContainer = document.querySelector('.volume-settings');
  const volumeOn = document.querySelector('.volume-up-icon');
  const volumeOff = document.querySelector('.volume-mute-icon');
  startingButton.addEventListener('click', () => {
    const loader = document.createElement('DIV');
    loader.classList.add('loader');
    infoContainer.remove();
    hint.style.visibility = 'visible';
    main.prepend(loader);
    const showingDetails = new Promise ((resolve) => {
      setTimeout(() => {
        loader.remove();
        hint.style.visibility = 'hidden';
        resolve();
      }, 4000);
    })
    showingDetails.then(() => {
      healthPoints.style.visibility = 'visible';
      volumeContainer.style.visibility = 'visible';
    })
  });
  volumeContainer.addEventListener('click', () => {
    if (volumeOn.style.display === 'none') {
      volumeOn.style.display = 'block';
      volumeOff.style.display = 'none';
    } else {
      volumeOn.style.display = 'none';
      volumeOff.style.display = 'block';
    }
  })
}
