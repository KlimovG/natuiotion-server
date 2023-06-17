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
        this.videoStream = await axios.get('http://172.16.4.45:8080/video', {
          responseType: 'stream',
        });

        // Error handler for the stream
        this.videoStream.data.on('error', (error) => {
          console.error('Stream error: ', error);
          this.videoStream = undefined;
        });
      }
      res.setHeader(
        'Content-Type',
        'multipart/x-mixed-replace; boundary=frame',
      );
      this.videoStream.data.pipe(res);
    } catch (e) {
      console.log(e);
      this.videoStream = undefined;
      res.status(500).send('Error while streaming video');
    }
  }
}
