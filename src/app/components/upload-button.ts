import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
    standalone: true,
    selector: 'app-upload-image',
    template: `
    <div class="flex-auto">
        <p-fileUpload name="myfile[]" url="./upload.php" multiple="multiple"></p-fileUpload>
    </div>
    `,
    styles: [`
    :host {
        width: 100%
    }
    `],
    imports: [
        FileUploadModule,
        HttpClientModule
    ]
})
export class UploadImageComponent {
    @Input() rows: any[];
    @Input() buttons: any[];
}

export interface ColumnItems {
    field: string;
    type: string;
    header: string;
}