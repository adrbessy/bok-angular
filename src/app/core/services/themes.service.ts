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
            map(themes => [...themes].sort((a,b) => a.sort - b.sort)),
            map(sortedThemes => sortedThemes[sortedThemes.length - 1]),
            map(previousTheme => previousTheme ? previousTheme.sort : -1 ),
            map(previousSort => ({
                ...formValue,
                createdDate: new Date(),
                sort: previousSort + 1 
            })),
            switchMap(newTheme => this.http.post<Theme>(`${environment.apiUrl}/Themes`, newTheme))
        );
    }

    deleteById(id: number) {
        this.http.delete<Theme>(`${environment.apiUrl}/Themes/deleteById/${id}`);
    }

    deleteTheme(themeId: number): Observable<Theme>{
        return this.http.delete<Theme>(`${environment.apiUrl}/Themes/${themeId}`);
    }

    getAllThemes(): Observable<Theme[]>{
        return this.http.get<Theme[]>(`${environment.apiUrl}/Themes`);
    }

    getThemeById(themeId: number): Observable<Theme> {
        return this.http.get<Theme>(`${environment.apiUrl}/Themes/${themeId}`);
    }
    
    saveThemes(updatedThemes : Theme[]): Observable<Theme[]> {
        return this.http.post<Theme[]>(`${environment.apiUrl}/Themes/saveThemes`, updatedThemes);
    }

}