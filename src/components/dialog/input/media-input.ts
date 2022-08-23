import { BaseComponent } from '../../component.js';
import { MediaData } from '../dialog.js';

export class MediaSectionInput
  extends BaseComponent<HTMLElement>
  implements MediaData
{
  constructor() {
    super(`<form>
                <div class="form__container">
                    <p>Title</p>
                    <input id="title" type="text" />
                </div>
                <div class="form__container">
                    <p>URL</p>
                    <input id="url" type="text" />
                </div>
            </form>`);
  }
  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }
  get url(): string {
    const element = this.element.querySelector('#url')! as HTMLInputElement;
    return element.value;
  }
}
