import { ENV, HttpMethod } from '../../common/enums/enums';

class Image {
  constructor({ http, imageRepository }) {
    this._imageRepository = imageRepository;
    this._http = http;
  }

  async upload(file) {
    const { link, deletehash } = await this._http.load(
      'https://api.imgur.com/3/upload',
      {
        method: HttpMethod.POST,
        data: {
          image: file.buffer.toString('base64')
        },
        headers: { Authorization: `Client-ID ${ENV.IMGUR.ID}` }
      }
    );

    return this._imageRepository.create({
      link,
      deletehash
    });
  }
}

export { Image };
