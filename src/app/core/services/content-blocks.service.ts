import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, iif } from "rxjs";
import { map, switchMap, mergeMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ContentBlock } from "../models/bok.model";

@Injectable({
    providedIn: 'root'
})
export class ContentBlocksService {

    constructor(private http: HttpClient) {}

    addContentBlock(formValue: { title: string, content: string, themeId: number }): Observable<ContentBlock> {
        return this.getContentBlocksByThemeId(formValue.themeId).pipe(
            map(contentBlocks => [...contentBlocks].sort((a,b) => a.sort - b.sort)),
            map(sortedContentBlocks => sortedContentBlocks[sortedContentBlocks.length - 1]),
            map(previousContentBlock => previousContentBlock ? previousContentBlock.sort : -1 ),
            map(previousSort=> ({
                ...formValue,
                createdDate: new Date(),
                sort: previousSort + 1 
            })),
            switchMap(newContentBlock => this.http.post<ContentBlock>(`${environment.apiUrl}/ContentBlocks`, newContentBlock))
        );
    }

    saveContentBlocks(updatedContentBlocks : ContentBlock[]): Observable<ContentBlock[]> {
        console.log("in replace")
        for(var index in updatedContentBlocks){
            console.log(updatedContentBlocks[index]);
          }
        const a = this.http.post<ContentBlock[]>(`${environment.apiUrl}/ContentBlocks/saveContentBlocks`, updatedContentBlocks);
        a.subscribe(a=> {
            for(var index in a){
                console.log(a[index]);
              }
        })
        return a;
    }

    deleteByThemeId(themeId: number) {
        this.http.delete<ContentBlock>(`${environment.apiUrl}/ContentBlocks/deleteByThemeId/${themeId}`);
    }

    deleteContentBlock(contentBlockId: number): Observable<ContentBlock>{
        return this.http.delete<ContentBlock>(`${environment.apiUrl}/ContentBlocks/${contentBlockId}`);
    }

    getAllContentBlocks(): Observable<ContentBlock[]>{
        return this.http.get<ContentBlock[]>(`${environment.apiUrl}/ContentBlocks`);
    }
    
    getContentBlockById(contentBlockId: number): Observable<ContentBlock> {
        return this.http.get<ContentBlock>(`${environment.apiUrl}/ContentBlocks/${contentBlockId}`);
      }

    getContentBlocksByThemeId(themeId: number): Observable<ContentBlock[]>{
        return this.http.get<ContentBlock[]>(`${environment.apiUrl}/ContentBlocks/theme/${themeId}`);
    }

    updateContentBlock(updatedContentBlock : ContentBlock): Observable<ContentBlock>{
        return this.http.put<ContentBlock>(`${environment.apiUrl}/ContentBlocks`, updatedContentBlock);
    }       

}