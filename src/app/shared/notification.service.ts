import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ApiResponse} from '../backend-api/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private messageService: MessageService) {
  }

  public success(message: string) {
    this.messageService.add(
        {severity: 'success', summary: 'Success', detail: message});
  }

  public error(message: string) {
    this.messageService.add(
        {severity: 'error', summary: 'Error', detail: message});
  }

  show(apiResponse: ApiResponse) {
    if (apiResponse.success) {
      this.success(apiResponse.message);
    } else {
      this.error(apiResponse.message);
    }
  }

}
