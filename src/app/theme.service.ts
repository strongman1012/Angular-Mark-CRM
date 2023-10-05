import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class PrimeNGThemeService {

    constructor(@Inject(DOCUMENT) private document: Document) {}

    switchTheme(scheme: string) {
        const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

        if (themeLink) {
            themeLink.href = 'md-'+scheme + '-lara.css';
        }
    }
}
