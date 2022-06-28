import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs';

@Processor('file-operation-queue')
export class FileConsumer {
  @Process('delete-file')
  async fileDeletionJob(job: Job<unknown>) {
    const jobData: any = job.data;

    fs.unlinkSync(jobData.filePath);
  }
}
