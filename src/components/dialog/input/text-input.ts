import { BaseComponent } from '../../component.js';
import { TextData } from '../dialog.js';

export class TextSectionInput
  extends BaseComponent<HTMLElement>
  implements TextData
{
  constructor() {
    super(`<form>
                <div class="form__container">
                    <p>Title</p>
                    <input id="title" type="text" />
                </div>
                <div class="form__container">
                    <p>Body</p>
                    <textarea id="body" type="text"row="3"></textarea>
                </div>
            </form>`);
  }
  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }
  get body(): string {
    const element = this.element.querySelector('#body')! as HTMLInputElement;
    return element.value;
  }
}
