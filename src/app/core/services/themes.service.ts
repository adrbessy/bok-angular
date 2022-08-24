import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ContentBlock, Theme } from "../models/bok.model";

@Injectable({
    providedIn: 'root'
})
export class ThemesService {

    constructor(private http: HttpClient){}

    addTheme(formValue: { name: string }): Observable<Theme> {
        return this.getAllThemes().pipe(
            map(themes => [...themes].sort((a,b) => a.id - b.id)),
            map(sortedThemes => sortedThemes[sortedThemes.length - 1]),
            map(previousTheme => ({
                ...formValue,
                createdDate: new Date(),
                id: previousTheme.id + 1 
            })),
            switchMap(newTheme => this.http.post<Theme>(`${environment.apiUrl}/Themes`, newTheme))
        );
    }

    getAllThemes(): Observable<Theme[]>{
        return this.http.get<Theme[]>(`${environment.apiUrl}/Themes`);
    }

    getThemeById(themeId: number): Observable<Theme> {
        return this.http.get<Theme>(`${environment.apiUrl}/Themes/${themeId}`);
    }
    

}