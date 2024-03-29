import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemesService } from 'src/app/core/services/themes.service';
import { Theme } from '../../../core/models/bok.model';
import { ContentBlockListComponent } from '../content-block-list/content-block-list.component';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent{

  constructor(private router: Router,
    private themesService: ThemesService,
    private route: ActivatedRoute){}

  @Input() theme!: Theme;
  themes!: Theme[];
  subtheme!: Theme;
  //showSubthemes!: Boolean;
  arrow: string = "keyboard_arrow_right";

  ngOnInit(): void {
    this.themesService.getAllThemes().subscribe(themes => {
      this.themes = themes.sort(this.compare);
    });
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

  drop(event: CdkDragDrop<Theme[]>) {
    moveItemInArray(this.themes, event.previousIndex, event.currentIndex);
    //always, recalculate the order of the container (the list to drag)
    this.themes.forEach((x,index)=>{
      x.sort=-index
    })
    for(var index in this.themes){
      console.log(this.themes[index]);
    }
    /*console.log(this.theme.name);
    console.log("event.previousContainer.data[event.previousIndex].name : " + event.previousContainer.data[event.previousIndex].name);*/
    this.themesService.updateThemes(this.themes).subscribe(themes => {
      this.themes = themes.sort(this.compare);
    });
  }

  onArrow(){
    if(this.theme.showSubthemes){
      this.theme.showSubthemes = false;
    }
    else{
      this.theme.showSubthemes = true;
    }
    this.themesService.editTheme((this.theme)).subscribe();
  }

  onTheme(){
    this.router.navigateByUrl(`contentBlocks/theme/${this.theme.id}`);
  }

  onAddNewContentBlock(): void {
    this.router.navigateByUrl(`contentBlocks/create/${this.theme.id}`);
  }

  onAddNewContentBlockForSubtheme(subtheme: Theme): void {
    this.router.navigateByUrl(`contentBlocks/create/${subtheme.id}`);
  }

  onAddNewSubtheme() : void{
    this.router.navigateByUrl(`contentBlocks/createTheme/${this.theme.id}`);
  } 

  onDeleteTheme(){
    if(confirm("Are you sure to delete ?")) {
      const themeId = +this.theme.id;
      this.themesService.deleteTheme(themeId).subscribe((reponse) =>
        {
          location.reload();
        },
        (error) => {
          console.log('Erreur !' + error);
        }
      );
    }
  }

  onDownload(){
    /*const blob = new Blob(["lol"], { type: 'text/plain' });
    const url= window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = "myfileaa.txt";
    anchor.href = url;
    window.open(url);*/
    this.saveData("bonjour", "blabla.txt");
  }

  saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    return function (data: any, fileName: string) {
        var json = JSON.stringify(data),  
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
  }());

  onEditThemeName(themeId: number){
    this.router.navigateByUrl(`contentBlocks/editTheme/${themeId}`);
  }

  onSubDeleteTheme(subthemeId: number){
    if(confirm("Are you sure to delete ?")) {
      this.themesService.deleteTheme(subthemeId).subscribe((reponse) =>
        {
          this.router.navigateByUrl(`contentBlocks/theme/0`);
          location.reload();
        },
        (error) => {
          console.log('Erreur !' + error);
        }
      );
    }
  }

}
