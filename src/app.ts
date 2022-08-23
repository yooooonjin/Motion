import { TextSectionInput } from './components/dialog/input/text-input.js';
import {
  InputDialog,
  MediaData,
  TextData,
} from './components/dialog/dialog.js';
import { Component } from './components/component.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from './components/page/page.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';

type inputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    //   'https://picsum.photos/600/300'
    //   'https://youtu.be/FaHRCzKFoVs'

    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );

    this.page.addChild(
      new ImageComponent('Image Title', 'https://picsum.photos/600/300')
    );
    this.page.addChild(
      new VideoComponent('Video Title', 'https://youtu.be/FaHRCzKFoVs')
    );
    this.page.addChild(
      new NoteComponent('Note Title', "Don't forget to code your dream")
    );
    this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
    this.page.addChild(
      new ImageComponent('Image Title', 'https://picsum.photos/600/300')
    );
    this.page.addChild(
      new VideoComponent('Video Title', 'https://youtu.be/FaHRCzKFoVs')
    );
    this.page.addChild(
      new NoteComponent('Note Title', "Don't forget to code your dream")
    );
    this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    inputComponent: inputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;

    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new inputComponent();

      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOncloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnsubmitListener(() => {
        const image = makeSection(input);
        this.page.addChild(image);

        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
