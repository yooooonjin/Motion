import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
    <div class="video__player">
      <iframe class="video__iframe"></iframe>
    </div>
    <h2 class="page-item__title video__title"></h2>
    </section>`);

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;

    const iframe = this.element.querySelector(
      '.video__iframe'
    )! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url);
  }

  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}

// <iframe
//   width='1280'
//   height='720'
//   src='https://www.youtube.com/embed/-iIfnjAhYU8'
//   title='빛나는 바다처럼🌊 상쾌하고 신나는 여름팝송'
//   frameborder='0'
//   allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//   allowfullscreen
// ></iframe>;
