import { BaseComponent } from '../../component.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, item: string) {
    super(`<section class="todo">
        <h2 class="page-item__title todo__title"></h2>
        <input type='checkbox' id="todo-checkbox"/>
        <label for="todo-checkbox" class="todo__label"></label>
    </section>`);

    const titleElement = this.element.querySelector(
      '.todo__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;

    const itemElement = this.element.querySelector(
      '.todo__label'
    )! as HTMLInputElement;
    itemElement.insertAdjacentText('afterend', item);
  }
}
