import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
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
    private themesService: ThemesService){}

  @Input() theme!: Theme;
  themes!: Theme[];

  ngOnInit(): void {
    this.themesService.getAllThemes().subscribe(themes => {
      this.themes = themes;
    });
  }

  onTheme(){
    this.router.navigateByUrl(`contentBlocks/theme/${this.theme.id}`);
  }

  onAddNewContentBlock(): void {
    this.router.navigateByUrl(`contentBlocks/create/${this.theme.id}`);
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

}
