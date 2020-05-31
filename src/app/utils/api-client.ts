import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export class ApiClient {
    private readonly apiUrl = environment.apiUrl;
    private headers: HttpHeaders;

    constructor(
        private readonly http: HttpClient,
    ) {
        this.updateHeaders();
    }

    public async get<T>(apiRelativePath: string, query?: object): Promise<T> {
        return await this.sendRequest(this.http.get<T>(this.apiUrl + apiRelativePath + this.getQueryStr(query) + '?apiKey=' + localStorage.getItem('apiKey'), { headers: this.headers }));
    }

    public async post<T>(apiRelativePath: string, body: any = null): Promise<T> {
        return await this.sendRequest(this.http.post<T>(this.apiUrl + apiRelativePath + '?apiKey=' + localStorage.getItem('apiKey'), body, { headers: this.headers }));
    }

    public async put<T>(apiRelativePath: string, body: any = null): Promise<T> {
        return await this.sendRequest(this.http.put<T>(this.apiUrl + apiRelativePath + '?apiKey=' + localStorage.getItem('apiKey'), body, { headers: this.headers }));
    }

    public async delete(apiRelativePath: string): Promise<void> {
        await this.sendRequest(this.http.delete(this.apiUrl + apiRelativePath + '?apiKey=' + localStorage.getItem('apiKey'), { headers: this.headers }));
    }

    private updateHeaders(): void {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    private getQueryStr(query: object): string {
        let str = '';
        if (!query) {
            return str;
        }
        for (const key of Object.keys(query)) {
            const value = query[key];
            if (value || value === 0 || value === false) {
                const array = Array.isArray(value) ? value : [ value ];
                for (const item of array) {
                    str += (str ? '&' : '?') + key + '=' + encodeURIComponent(this.getQueryParamStringValue(item));
                }
            }
        }
        return str;
    }

    private getQueryParamStringValue(item: any): string {
        if (item == null) {
            return '';
        } else if (item instanceof Date) {
            return item.toISOString();
        } else {
            return item.toString();
        }
    }

    private async sendRequest<T>(request: Observable<T>): Promise<T> {
        return await request.toPromise();
    }
}
