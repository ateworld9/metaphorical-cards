/* eslint-disable func-names */
const dragAndDrop = () => {
  let newCard;
  const carusel = document.querySelector('#demo');
  carusel.addEventListener('dragstart', (event) => {
    if (event.target.tagName === 'IMG') {
      event.target.classList.add('hide');
      const card = event.target;
      newCard = card;
    }
  });
  carusel.addEventListener('dragend', (event) => {
    if (event.target.tagName === 'IMG') {
      event.target.classList.remove('hide');
    }
  });
  const cardHolders = document.querySelectorAll('.card-holder');
  cardHolders.forEach((holder) => {
    holder.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    holder.addEventListener('dragenter', function (event) {
      event.target.classList.remove('bg-success');
      this.classList.add('hovered');
    });
    holder.addEventListener('dragleave', function (event) {
      event.target.classList.remove('hovered');
      this.classList.add('bg-success');
    });
    holder.addEventListener('drop', function (event) {
      event.target.classList.remove('hovered');
      this.classList.add('bg-success');
      this.append(newCard);
      newCard.classList.remove('hide');
      newCard.setAttribute('style', 'width:100%; height: 17em;');
      newCard = '';
    });
  });
};
dragAndDrop();

const dragAndDropOut = () => {
  const playGround = document.querySelector('#playground');
  let newCard;
  playGround.addEventListener('dragstart', (event) => {
    if (event.target.tagName === 'IMG') {
      console.log(1);
      event.target.classList.add('hide');
      const card = event.target;
      newCard = card;
    }
  });
  playGround.addEventListener('dragend', (event) => {
    if (event.target.tagName === 'IMG') {
      event.target.classList.remove('hide');
    }
  });
  const imgHolders = document.querySelectorAll('.img-holder');
  imgHolders.forEach((holder) => {
    holder.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
  });
};
dragAndDropOut();
