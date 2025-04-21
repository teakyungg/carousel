const carousel_box = document.querySelector('#carousel');

const up = document.querySelector('.up');
const down = document.querySelector('.down');

up.addEventListener('click', function () {
    carousel(carousel_box, 'up', 1);
})

down.addEventListener('click', function () {
    carousel(carousel_box, 'down', 1);
})


// 여기서 부터 코드

// 옮길 element, 방향(위 아래), 이동 시간
export function carousel(element, dir, move_time) {

    let isMoving = element.dataset.isMoving;
    let move_count = element.dataset.move_count;

    if (isMoving === undefined || isMoving === 'false') {
        isMoving = false;
    }

    if (move_count === undefined) {
        move_count = 0;
        element.dataset.move_count = move_count;
    }

    else {
        move_count = parseInt(element.dataset.move_count);
    }



    if (isMoving) return;

    // 방향에 따라 곱할값
    let mius = 0;
    isMoving = true;
    element.dataset.isMoving = isMoving;

    let height = getComputedStyle(element.firstElementChild).height;
    height = parseInt(height);

    element.style.transition = `all ${move_time}s`;

    // 내려가는거 마지막이고 버튼 눌렀을때
    if (move_count == element.children.length - 1 && dir === 'up') {

        const first = element.firstElementChild.cloneNode(true);
        element.appendChild(first);

        first.style.position = 'absolute';
        first.style.bottom = `${-height}px`;
        first.style.left = '50%';
        first.style.transform = 'translate(-50%, 0)';
        first.style.width = '100%';


        // 초기화 시간 , 나중에 정하기
        setTimeout(() => {
            move_count = 0;
            element.dataset.move_count = move_count;

            element.style.transform = `translate(0,0)`;
            element.style.transition = 'none';
            first.remove();
        }, (move_time * 1000));

    }

    // 올라가는거 마지막이고 눌렀을때
    if (move_count == 0 && dir === 'down') {

        const last = element.lastElementChild.cloneNode(true);
        element.prepend(last);

        last.style.position = 'absolute';
        last.style.top = `${-height}px`;
        last.style.left = '50%';
        last.style.transform = 'translate(-50%, 0)';
        last.style.width = '100%';

        // 초기화 시간 , 나중에 정하기
        setTimeout(() => {
            move_count = element.children.length - 2;
            element.dataset.move_count = move_count;

            element.style.transform = `translate(0,${-((element.children.length - 2) * height)}px)`;
            element.style.transition = 'none';
            last.remove();
        }, (move_time * 1000));
    }


    if (dir === 'up') {
        move_count++;
        element.dataset.move_count = move_count;
        mius = -1;
    }

    else if (dir === 'down') {
        move_count--;
        element.dataset.move_count = move_count;
        mius = 1;
    }

    setTimeout(() => {
        isMoving = false;
        element.dataset.isMoving = isMoving;
    }, (move_time * 1000))

    let loc = now_location(element);
    element.style.transform = `translate(0,${loc + (height * mius)}px)`;

}

// 현재 위치값 추출
function now_location(element) {

    element = getComputedStyle(element).transform;
    let loc = element.split(',')[5];

    if (loc === undefined) { loc = 0; }
    else { loc = parseInt(loc); }

    return loc;
}

