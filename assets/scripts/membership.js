import { fetchRanks, fetchWeight } from './fetch.js';

const rankList = document.querySelector('.rank-list');
const benefit = document.querySelector('.benefit');
const progressBar = document.querySelector('.membership-progress');
const achieve = document.querySelector('.achieve');
const rankName = document.querySelector('.rank-name');
const benefitPecentage = document.querySelector('.benefit-percentage');

try {
    // get ranks
    const GET_RANKS = await fetchRanks();
    // sort ranks asc
    const rankSorted = GET_RANKS.sort(
        (a, b) => parseFloat(a.giam_gia) - parseFloat(b.giam_gia)
    );
    // show rank bản thân
    const user = JSON.parse(localStorage.getItem('amamy_user'));
    const userInfor = JSON.parse(localStorage.getItem('amamy_user-infor'));
    const myRankIndex = rankSorted.findIndex(
        (rank) => rank.name === userInfor.user_rank
    );
    rankName.textContent =
        rankSorted[myRankIndex].name === 'Thành viên mới'
            ? 'Thành viên mới'
            : 'Hạng ' + rankSorted[myRankIndex].name;
    benefitPecentage.textContent =
        rankSorted[myRankIndex].name === 'Đồng'
            ? '3%'
            : GET_RANKS.user_rank === 'Bạc'
            ? '4%'
            : GET_RANKS.user_rank === 'Vàng'
            ? '5%'
            : '1.5%';
    // highlight rank trong progress
    document
        .querySelector('.level.newbie')
        .classList.toggle('active', rankSorted[myRankIndex].giam_gia === '1.5');
    document
        .querySelector('.level.copper')
        .classList.toggle('active', rankSorted[myRankIndex].giam_gia === '3');
    document
        .querySelector('.level.silver')
        .classList.toggle('active', rankSorted[myRankIndex].giam_gia === '4');
    document
        .querySelector('.level.gold')
        .classList.toggle('active', rankSorted[myRankIndex].giam_gia === '5');

    const weightSentElement = document.querySelector('.weight-sent');
    const thumbProgress = document.querySelector(
        '.member-ship .membership-progress .thumb'
    );
    const instruction = document.querySelector('.instruction');
    const weightNeededElement = document.querySelector('.weight-needed');
    const rankNameNext = document.querySelector('.rank-name-next');
    const discountPecentNext = document.querySelector('.discount-percent-next');

    // số kg đã gửi
    const WEIGHT = await fetchWeight(user.token);
    // console.log(WEIGHT);
    if (WEIGHT.success) {
        const weightSent = WEIGHT.tong_so_can;
        weightSentElement.textContent = weightSent;
        const lastRank = rankSorted[rankSorted.length - 1];
        const currentPercent =
            (parseFloat(weightSent) / parseFloat(lastRank.so_can_can_dat)) *
            100;
        // console.log(currentPercent);

        thumbProgress.style.width = currentPercent + '%';
        progressBar.classList.remove('skeleton');
        // ẩn dòng gửi thêm khi đạt rank tối đa
        if (myRankIndex === rankSorted.length - 1) {
            instruction.style.display = 'none';
        } else {
            const nextRank = rankSorted[myRankIndex + 1];
            const weightNeeded =
                parseFloat(nextRank.so_can_can_dat) - parseFloat(weightSent);
            weightNeededElement.textContent = weightNeeded + 'kg';
            rankNameNext.textContent = 'Hạng ' + nextRank.name;
            discountPecentNext.textContent = nextRank.giam_gia;
        }
    }

    // render ranks
    let html = '';
    rankSorted.forEach(
        (rank) =>
            (html += `<li class="">
                    <div class="${
                        rank.giam_gia === '3'
                            ? 'copper'
                            : rank.giam_gia === '4'
                            ? 'silver'
                            : rank.giam_gia === '5'
                            ? 'gold'
                            : 'newbie'
                    } accordion">
                        <h4>${
                            rank.name === 'Thành viên mới'
                                ? rank.name
                                : 'Hạng ' + rank.name
                        }</h4>
                        <p>Giảm ${
                            rank.giam_gia
                        }% trên tổng hóa đơn <img class="icon" src="./assets/svgs/fi_chevron-down-white.svg" alt=""></p>
                    </div>
                    <div class="detail panel">
                        <h5>Quyền lợi</h5>
                        <p>-Giảm ${
                            rank.giam_gia
                        }% trên tổng hóa đơn mỗi lần gửi hàng</p>
                        <h5>Điều kiện</h5>
                        <p>-${
                            rank.so_can_can_dat == 0
                                ? 'Đã đăng kí hội viên'
                                : `Đã gửi tại Amamy ${rank.so_can_can_dat}kg`
                        }</p>
                    </div>
                    </li>`)
    );
    rankList.innerHTML = html;
    progressBar.classList.remove('skeleton');
    benefit.classList.remove('skeleton');
    achieve.classList.remove('skeleton');
    rankList.classList.remove('skeleton');
} catch (error) {
    // console.log(error);
    progressBar.classList.remove('skeleton');
    benefit.classList.remove('skeleton');
    achieve.classList.remove('skeleton');
    rankList.classList.remove('skeleton');
}

//  toggle rank dropdown
rankList.addEventListener('click', function (event) {
    const targetElement = event.target;
    const rankItem = targetElement.closest('li');

    if (rankItem) {
        rankItem.classList.toggle('active');
        rankItem.querySelector('.detail').classList.toggle('active');
    }
});
