fetch('https://amamy.net/wp-json/custom/v1/rank')
    .then((raw) => raw.json())
    .then((res) => {
        // sort ranks asc
        const rankSorted = res.sort(
            (a, b) => parseFloat(a.giam_gia) - parseFloat(b.giam_gia)
        );
        // show rank bản thân
        const userInfor = JSON.parse(localStorage.getItem('amamy_user-infor'));
        const myRankIndex = rankSorted.findIndex(
            (rank) => rank.name === userInfor.user_rank
        );
        document.querySelector('.rank-name').textContent =
            rankSorted[myRankIndex].name === 'Thành viên mới'
                ? 'Thành viên mới'
                : 'Hạng ' + rankSorted[myRankIndex].name;
        document.querySelector('.benefit-percentage').textContent =
            rankSorted[myRankIndex].name === 'Đồng'
                ? '3%'
                : res.user_rank === 'Bạc'
                ? '4%'
                : res.user_rank === 'Vàng'
                ? '5%'
                : '1.5%';

        // highlight rank trong progress
        document
            .querySelector('.level.newbie')
            .classList.toggle(
                'active',
                rankSorted[myRankIndex].giam_gia === '1.5'
            );
        document
            .querySelector('.level.copper')
            .classList.toggle(
                'active',
                rankSorted[myRankIndex].giam_gia === '3'
            );
        document
            .querySelector('.level.silver')
            .classList.toggle(
                'active',
                rankSorted[myRankIndex].giam_gia === '4'
            );
        document
            .querySelector('.level.gold')
            .classList.toggle(
                'active',
                rankSorted[myRankIndex].giam_gia === '5'
            );

        // số kg đã gửi
        fetch('https://amamy.net/wp-json/custom/v1/rank_can')
            .then((raw) => raw.json())
            .then((res) => {
                if (res.success) {
                    const weightSent = res.tong_so_can;
                    document.querySelector('.weight-sent').textContent =
                        weightSent;
                    const lastRank = rankSorted[rankSorted.length - 1];
                    const currentPercent =
                        (parseFloat(lastRank.so_can_can_dat) / 100) *
                        parseFloat(weightSent);
                    document.querySelector(
                        '.member-ship .membership-progress .thumb'
                    ).style.width = currentPercent + '%';
                    // ẩn dòng gửi thêm khi đạt rank tối đa
                    if (myRankIndex === rankSorted.length - 1) {
                        document.querySelector('.instruction').style.display =
                            'none';
                    } else {
                        const nextRank = rankSorted[myRankIndex + 1];

                        const weightNeeded =
                            parseFloat(nextRank.so_can_can_dat) -
                            parseFloat(weightSent);
                        document.querySelector('.weight-needed').textContent =
                            weightNeeded + 'kg';
                        document.querySelector('.rank-name-next').textContent =
                            'Hạng ' + nextRank.name;
                        document.querySelector(
                            '.discount-percent-next'
                        ).textContent = nextRank.giam_gia;
                    }
                }
            })
            .catch((err) => {
                // console.log(err)
            });

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
                        <p>-Đã đăng kí thành viên tại AMAMY</p>
                    </div>
                    </li>`)
        );
        document.querySelector('.rank-list').innerHTML = html;
    })
    .catch((err) => {
        // console.log(err);
    });

document.addEventListener('DOMContentLoaded', (event) => {
    const rankList = document.querySelector('.rank-list');
    rankList.addEventListener('click', function (event) {
        const targetElement = event.target;
        const rankItem = targetElement.closest('li');

        if (rankItem) {
            rankItem.classList.toggle('active');
            rankItem.querySelector('.detail').classList.toggle('active');
        }
    });
});
