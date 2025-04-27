/* 좌우 이동 */
const carousel_box = document.querySelector('.carousel_inner_2 > .carousel_RightLeft');
const right = document.querySelector('.right');
const left = document.querySelector('.left');

right.addEventListener('click', function () {
    carousel_RightLeft(carousel_box, 'right', 1);
})

left.addEventListener('click', function () {
    carousel_RightLeft(carousel_box, 'left', 1);
})


// 옮길 element, 방향(좌,우), 이동 시간
function carousel_RightLeft(element, dir, move_time) {

    let isMoving = element.dataset.isMoving;
    let move_count = element.dataset.move_count;

    // 현재 움직이고 있는지 체크한다.
    isMoving = (isMoving === undefined || isMoving === 'false') ? false : true;

    // 몇번 움직였는지 체크한다.
    move_count = (move_count === undefined) ? 0 : parseInt(element.dataset.move_count);
    element.dataset.move_count = move_count;


    // 움직이고 있는 상태라면 실행하지 않는다.
    if (isMoving) return;

    // 방향에 따라 곱할값
    let mius = 0;

    isMoving = true;
    element.dataset.isMoving = isMoving;
    element.style.position = 'relative';

    // 이동 시킬 길이 추출
    let width = getComputedStyle(element.firstElementChild).width;
    width = parseInt(width);

    // transition 설정
    element.style.transition = `all ${move_time}s ease-in-out`;


    // 오른쪽 마지막이고 버튼 눌렀을때
    if (move_count == element.children.length - 1 && dir === 'right') {

        const first = element.firstElementChild.cloneNode(true);
        element.appendChild(first);

        // 임시 추가 노드 설정
        first.style.cssText =
            `position: absolute; 
             left : ${width * (element.children.length - 1)}px;`;

        // 초기화 옵션

        setTimeout(() => {
            move_count = 0;
            element.dataset.move_count = move_count;

            element.style.transform = `translate(0,0)`;
            element.style.transition = 'none';
            first.remove();
        }, (move_time * 1000));

    }

    // 왼쪽 마지막이고 눌렀을때
    if (move_count == 0 && dir === 'left') {

        const last = element.lastElementChild.cloneNode(true);
        element.prepend(last);

        // 임시 추가 노드 설정
        last.style.cssText =
            `position: absolute; 
             right: ${width}px `;


        // 초기화 옵션
        setTimeout(() => {
            move_count = element.children.length - 2;
            element.dataset.move_count = move_count;

            element.style.transform = `translate(${-((element.children.length - 2) * width)}px,0)`;
            element.style.transition = 'none';
            last.remove();
        }, (move_time * 1000));


    }



    if (dir === 'right') {
        move_count++;
        mius = -1;
    }

    else if (dir === 'left') {
        move_count--;
        mius = 1;
    }

    element.dataset.move_count = move_count;


    // 움직임 끝 알림
    setTimeout(() => {
        isMoving = false;
        element.dataset.isMoving = isMoving;
    }, (move_time * 1000))

    // 움직임 시작
    let loc = now_location(element);
    element.style.transform = `translate(${loc + (width * mius)}px,0)`;

}

// 현재 위치값 추출
function now_location(element) {

    element = getComputedStyle(element).transform;
    let loc = element.split(',')[4];

    if (loc === undefined) { loc = 0; }
    else { loc = parseInt(loc); }

    return loc;
}