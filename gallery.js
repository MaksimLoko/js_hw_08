import galleryItems from "./gallery-items.js";
// console.log(galleryItems);

galleryItems.forEach(({ description, preview, original }) => {
  let image = document.querySelector(".js-gallery");
  //   console.log(image);

  image.insertAdjacentHTML(
    "afterbegin",
    `<li class="gallery__item"> 
    <a class ="gallery__link" href="${original}"> 
    <img class="gallery__image" src="${preview}" data-source="${original}" alt ="${description}"</li>`
  );
});

// ====================================================================

let refs = {
  gallery: document.querySelector(".js-gallery"),
  openLightbox: document.querySelector(".js-lightbox"),
  largeImage: document.querySelector(".lightbox__image"),
  closeButton: document.querySelector(".lightbox__button"),
};
// console.log(refs);

refs.gallery.addEventListener("click", openlargeImage);
function openlargeImage(event) {
  event.preventDefault();
  refs.openLightbox.classList.add("is-open");
  // console.log(event.target);

  if (event.target.nodeName !== "IMG") {
    return;
  }
  let imageRef = event.target;
  // console.log(imageRef);
  // console.log(imageRef.dataset);
  // console.log(imageRef.dataset.source);
  refs.largeImage.src = imageRef.dataset.source;
  refs.largeImage.alt = imageRef.alt;
}
// ==============================================
// реализуем Крестик-закрыть
refs.closeButton.addEventListener("click", closeLargeImage);
function closeLargeImage(event) {
  event.preventDefault();
  refs.openLightbox.classList.remove("is-open");
}
// ==============================================
// реализуем Escape
window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    refs.openLightbox.classList.remove("is-open");
  }
});
// =============================================
// реализуем ArrowLeft, ArrowRight
let imagArr = galleryItems.map((img) => {
  return img.original;
});
// console.log(imagArr);

let index = 0;
window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    index -= 1;
    if (index < 0) {
      index = imagArr.length - 1;
    }
    refs.largeImage.src = imagArr[index];
  }

  if (event.code === "ArrowLeft") {
    // console.log(index);
    index += 1;
    if (index >= imagArr.length) {
      index = 0;
    }
    refs.largeImage.src = imagArr[index];
  }
});
