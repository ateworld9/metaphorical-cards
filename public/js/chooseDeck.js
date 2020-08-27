let chooseDeck = document.getElementById('vertScroll');
// console.log(chooseDeck);

if (chooseDeck) {
    chooseDeck.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log(event.target.id);
        if (event.target.tagName === 'IMG') {
            const response = await fetch(`/game/${event.target.id}`);
            let result = await response.json();
            // console.log(result);
            console.log(result.picturePath1);
            let gorizScroll = document.getElementById('demo');
            console.log(gorizScroll);
            let imgScroll1 = document.getElementsByClassName('imgScroll1');
            for (let i = 0; i < imgScroll1.length; i++) {
                imgScroll1[i].src = result.picturePath1[i];
            }
            let imgScroll2 = document.getElementsByClassName('imgScroll2');
            for (let i = 0; i < imgScroll2.length; i++) {
                imgScroll2[i].src = result.picturePath2[i];
            }
        }
    })
}