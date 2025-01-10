export default function addHiddenClass(className, classNameAdd) {
  const elements = document.querySelectorAll(`.${classNameAdd}`);
  elements.forEach((element) => {
    element.classList.add(className);
  });
}
