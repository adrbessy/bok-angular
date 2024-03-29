import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/core/models/bok.model';
import { ThemesService } from 'src/app/core/services/themes.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  themes$!: Observable<Theme[]>;
  searchCtrl!: UntypedFormControl;
  themes!: Theme[];
  searchText: any;

  constructor(private themesService: ThemesService,
              private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.themesService.getAllThemes().subscribe(themes => {
      this.themes = themes.sort(this.compare);
    });
    this.initForm();
  }

  compare( a: Theme, b: Theme ) {
    if ( a.sort < b.sort ){
      return 1;
    }
    if ( a.sort > b.sort ){
      return -1;
    }
    return 0;
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
  }

  drop(event: CdkDragDrop<Theme[]>) {
    moveItemInArray(this.themes, event.previousIndex, event.currentIndex);
    //always, recalculate the order of the container (the list to drag)
    this.themes.forEach((x,index)=>{
      x.sort=-index
      //console.log("x.name : " + x.name);
    })
    //console.log("event.previousContainer.data[event.previousIndex].name : " + event.previousContainer.data[event.previousIndex].name);
    console.log("this.themes : " + this.themes);
    this.themesService.updateThemes(this.themes).subscribe(themes => {
      this.themes = themes.sort(this.compare);
    });
  }

}
