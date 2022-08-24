import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform{
    transform(value: string, maxLength = 70): string {
        if(value == null){
            return "";
        }
        if(value.length <= maxLength){
            return value;
        }
        return value.substring(0, maxLength) + '...';
    }
}