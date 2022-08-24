import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'timeAgo'
})
export class timeAgoPipe implements PipeTransform{
    timeDiffs = {
        minute: 60 * 1000,
        hour: 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        year: 365 * 24 * 60 * 60 * 1000
    }
    transform(value: string | Date): any {
        /*console.log("value : " + value);
        console.log("new Date(value) : " + new Date(value));
        const then = new Date(value).getTime();
        const now = Date.now();
        const diff = now - then;
        console.log("diff : " + diff);
        console.log("diff in minutes : " + diff / this.timeDiffs.minute);
        if (diff < this.timeDiffs.minute) {
            return 'Il y a quelques secondes';
          } else if (diff < this.timeDiffs.hour) {
            //return 'Il y a quelques minutes';
            return new Date(value).getDay() + "/" + new Date(value).getMonth() + "/" + new Date(value).getFullYear();
          } else if (diff < this.timeDiffs.day) {
            return 'Il y a quelques heures';
          } else if (diff > this.timeDiffs.year) {
            return 'Il y a plus d\'un an';
          } else {
            return new Date(value).getDay() + "/" + new Date(value).getMonth() + "/" + new Date(value).getFullYear();
          }*/
    }
}