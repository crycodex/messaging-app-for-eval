import { HttpService } from "../../baseRepositories/api/http/axios/axios-http-service";
import ApiRepository from "../../baseRepositories/api/respository";
import { ContentType, RequestData } from "../../http/Http";
import Paginated from "../../types/paginated";

export default class ChatRepository extends ApiRepository {
  constructor() {
    super("messages");
  }

  public async getEvents<T>(
    limit: number,
    offset: number
  ): Promise<Paginated<T>> {
    const data: RequestData = {
      endpoint: `${this.endpoint}`,
      params: { limit, offset },
    };

    return HttpService.getAsync(data);
  }

  public async sendTextMessage<T>(text: string): Promise<T> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/send-text`,
      body: { text },
    };

    return HttpService.postAsync(data);
  }

  public async sendImageMessage<T>(uri: string, caption: string): Promise<T> {
    const formData = new FormData();

    const filename = uri.split("/").pop() || "image.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image/jpeg";

    formData.append("image", {
      uri,
      name: filename,
      type,
    } as any);

    if (caption) {
      formData.append("caption", caption);
    }

    const data: RequestData = {
      endpoint: `${this.endpoint}/send-image`,
      body: formData,
      headers: {
        "Content-Type": ContentType.MULTIPART_FORM_DATA,
      },
    };

    return HttpService.postAsync(data);
  }
}
