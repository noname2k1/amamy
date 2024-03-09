const rankItems = document.querySelectorAll('.rank-list li');
const detailElements = document.querySelectorAll('.detail');

rankItems.forEach((item) => {
    item.onclick = function () {
        // console.log(item);
        // if (item.classList.contains('active')) {
        //     item.querySelector('.detail').style.visibility = 'hidden';
        // }
        item.classList.toggle('active');
        item.querySelector('.detail').classList.toggle('active');
    };
});
