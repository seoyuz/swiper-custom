$(document).ready(function(){
    const swipers = []; //swipers라는 빈 배열을 만듦
    const swiperContainer = document.querySelectorAll(".swiper-container");
    const tabMenu = document.querySelectorAll(".tab-menu");
    const tabContent = document.querySelectorAll(".tab-content");
    const prevSlide = document.querySelectorAll(".swiper-slide-prev");
    const nextSlide = document.querySelectorAll(".swiper-slide-next");

    for (let i = 0; i < swiperContainer.length; i++){ // i는 0부터 ~ swiperContainer의 갯수만큼 반복, 1씩 증가
        const container = swiperContainer[i];
        var swiper = new Swiper(container, {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            slidesPerGroup: 1,
            initialSlide: 0, //시작위치값

            loop: true,
            navigation: {
                nextEl: ".swiper-container .swiper-button-next",
                prevEl: ".swiper-container .swiper-button-prev",
            },
            on: {
                // event
                init: function () {

                    // document.querySelectorAll(".swiper-slide").classList.add("active");


                    // if (tabMenu[i].classList.contains("active")){
                                    
                    //     console.log('swiper initialized');
                    // }


                    // if (document.querySelectorAll(".swiper-slide").contains(".swiper-slide-active")) {
                    // // if ($(".swiper-slide").hasClass("swiper-slide-active")) {
        
                    //     console.log('swiper initialized');
                    // }




                    if (Array.from(document.querySelectorAll(".tab-content.active .swiper-container .swiper-slide")).some(slide => slide.classList.contains("swiper-slide-active"))) {

                        // 실행할 코드
                        console.log('swiper initialized');
                    }
                    
                },
            },
        });
        swipers.push(swiper); //swiper를 swipers라는 배열에 넣음
    }


    tabMenu.forEach((item, i) => {
        item.addEventListener("click", () => {
            // active된 탭메뉴를 누르면 슬라이드가 초기화 되지 않게끔 
            //tabMenu[i].classList.contains("active") -> active 클래스를 가지고 있는 탭메뉴의 index

            if (!tabMenu[i].classList.contains("active") && swipers[i]) {
                //탭메뉴의 index가 active클래스를 가지고있지 않고, i순번 스와이퍼일 때

                swipers[i].slideToLoop(0, 0, true); // i순번 스와이퍼의 슬라이드를 1로 옮김 
            }
            
            tabMenu.forEach(other => {
                other.classList.remove("active");
            });
            tabContent.forEach(other => {
                other.classList.remove("active");
            });
            tabMenu[i].classList.add("active");
            tabContent[i].classList.add("active");
        });
    });    
});