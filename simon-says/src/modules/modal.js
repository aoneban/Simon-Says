export function modalResponses(res, withTimeout = false) {
  const body = document.body;

  const modal = document.createElement('div');
  modal.setAttribute('id', 'myModal');
  modal.classList.add('modal');
  modal.style.display = 'block';

  const content = document.createElement('div');
  content.classList.add('modal-content');

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  const message = document.createElement('p');
  message.classList.add('content-message');
  message.textContent = res;

  const span = document.createElement('span');
  span.classList.add('close');
  span.innerHTML = '&times;';
  span.addEventListener('click', function () {
    modal.remove();
  });

  modalBody.append(message, span);
  content.append(modalBody);
  modal.append(content);
  body.append(modal);

  if (withTimeout) {
    setTimeout(() => {
      modal.remove();
    }, 3000);
  }
  return body;
}
