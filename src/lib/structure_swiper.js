import Swiper from "swiper";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

document.addEventListener("astro:page-load", () => {
  if (window.__swipers) {
    window.__swipers.forEach((swiper) => swiper.destroy(true, true));
  }

  const thumbsSwiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 6,
    freeMode: true,
    watchSlidesProgress: true,
    modules: [FreeMode, Thumbs],
  });

  const mainSwiper = new Swiper(".mySwiper2", {
    modules: [Navigation, Thumbs],
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  });

  window.__swipers = [thumbsSwiper, mainSwiper];
});
