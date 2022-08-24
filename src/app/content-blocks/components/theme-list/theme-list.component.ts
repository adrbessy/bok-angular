import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/core/models/bok.model';
import { ThemesService } from 'src/app/core/services/themes.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  themes$!: Observable<Theme[]>;
  searchCtrl!: UntypedFormControl;

  constructor(private themeService: ThemesService,
              private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.themes$ = this.themeService.getAllThemes();
    this.initForm();
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
  }

}
