import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as Stream from 'stream';
import axios, { AxiosResponse } from 'axios';

@Controller('polls')
export class PollsController {
  private videoStream: AxiosResponse<Stream>;

  @Get('video')
  async streamVideo(@Res() res: Response): Promise<any> {
    try {
      if (!this.videoStream) {
        this.videoStream = await axios.get('http://172.16.4.89:8080/video', {
          responseType: 'stream',
        });
      }
      res.setHeader(
        'Content-Type',
        'multipart/x-mixed-replace; boundary=frame',
      );
      this.videoStream.data.pipe(res);
    } catch (e) {
      console.log(e);
    }
  }
}
