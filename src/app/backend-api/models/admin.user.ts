import {Validators} from '@angular/forms';

export interface AdminUser {
    id: any;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    enabled: boolean;
}
