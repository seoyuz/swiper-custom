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
                init: function () { // 처음 진입 시 
                    updateSlides();
                },
                transitionEnd: function () {  // 슬라이드 변경 이후 실행
                    updateSlides();
                },
            },
        });
        swipers.push(swiper); //swiper를 swipers라는 배열에 넣음
    }


    // 현재 슬라이드 tab 이동
    function updateSlides() {
        document.querySelectorAll(".tab-content.active .swiper-container").forEach(function (elem) {
            const slideAll = elem.querySelectorAll(".swiper-slide");
            // const slideActive = elem.querySelector(".swiper-slide-active");
    
            slideAll.forEach(function (slide) {
                slide.removeAttribute("role"); // 초기 진입 시 슬라이드 role 삭제 (웹 접근성 이슈)
              
                if (slide.querySelector("a")) { // a태그 여부 검사

                    if (slide.classList.contains("swiper-slide-active")) { // slide-active 여부 검사

                        // swiper slide active가 있을 때
                        slide.querySelector("a").setAttribute("tabindex", "0"); // a 태그에 tabindex 설정
                    } else {

                        // 그 외 경우에는 tabindex -1로 포커스 이동이 안 되도록 설정
                        slide.querySelector("a").setAttribute("tabindex", "-1");
                    }
                }

            });

            // console.log(slideAll);
        });
    }


    // 탭메뉴
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