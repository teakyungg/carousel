let carousel_inner = document.querySelector('.carousel_inner_3');
let carousel_box = carousel_inner.querySelector('.carousel');
let item = carousel_box.querySelector('.item');

let item_width = parseInt(getComputedStyle(item).width);

/* 자식의 갯수 3개만 큼 부모의 width를 조정 (자식 최소 3개 필요) */
carousel_inner.style.width = `${item_width * 3}px`;

/* 버튼 연결 */
let right_button = document.querySelector('.right');
let left_button = document.querySelector('.left');

right_button.addEventListener('click',()=>{
    Right_Left_Multi('right');
});

left_button.addEventListener('click',()=>{
    Right_Left_Multi('left');
});

function Right_Left_Multi(dir){
    
    let lastChild = carousel_box.lastElementChild;
    let firstChild = carousel_box.firstElementChild;

    let minus = (dir === 'right') ? 1 : -1;
    let width = parseInt(getComputedStyle(carousel_box).transform.split(',')[4]);

    if(Number.isNaN(width)){ width = 0;}

    /* 움직이고 있다면 리턴한다. */
    if(carousel_box.dataset.moving === 'true'){
        return;
    }
    
    /* 움직임 체크 */
    carousel_box.dataset.moving = true;



    /* 오른쪽 버튼을 눌렀을때 */
    if(dir === 'right'){ 

       /* 마지막 노드 복사 */
       let clone = lastChild.cloneNode(true);
       
       carousel_box.prepend(clone);
       carousel_box.style.transition = 'none';
       carousel_box.style.transform = `translate(${-item_width}px,0)`;

       /* 여기서 새롭게 width 세팅해야함 */
       width = -item_width;
    }

    /* 왼쪽 버튼을 눌렀을때 */
    else if(dir === 'left'){ 
        let clone = firstChild.cloneNode(true);
        carousel_box.appendChild(clone);
    }

 
    requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
            carousel_box.style.transition = 'all 1s';
            carousel_box.style.transform = `translate(${(width + item_width * minus) }px,0)`;
            
            setTimeout(()=>{

                if(dir === 'right') {
                    lastChild.remove();
                }
    
                if(dir === 'left'){
                    firstChild.remove(); 
                    carousel_box.style.transition = 'none';
                    carousel_box.style.transform = `translate(${(0)}px,0)`;
                }

                carousel_box.dataset.moving = false;

            },1000);


        })
    })
   
}