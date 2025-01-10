export default function removeClass(className, classNameAdd) {
  const elements = document.querySelectorAll(`.${classNameAdd}`);
  elements.forEach((element) => {
    element.classList.remove(className);
  });
}
