import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from '../../../core/models/bok.model';
import { ContentBlockListComponent } from '../content-block-list/content-block-list.component';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent{

  constructor(private router: Router){}

  @Input() theme!: Theme;

  onTheme(){
    this.router.navigateByUrl(`contentBlocks/theme/${this.theme.id}`);
  }

  onAddNewContentBlock(): void {
    this.router.navigateByUrl(`contentBlocks/create/${this.theme.id}`);
  }

}
