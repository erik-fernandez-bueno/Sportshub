import { Injectable } from '@angular/core';
import * as tmImage from '@teachablemachine/image';

@Injectable({
  providedIn: 'root',
})
export class IaVigilantService {
  private model: any;
  private URL = "https://teachablemachine.withgoogle.com/models/622PQObvj/";

  async carregarModel() {
    this.model = await tmImage.load(this.URL + "model.json", this.URL + "metadata.json");
  }

  async predir(videoElement: HTMLVideoElement) {
    return await this.model.predict(videoElement);
  }
}
