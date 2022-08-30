import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/core/models/bok.model';
import { ThemesService } from 'src/app/core/services/themes.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent implements OnInit {

  theme!: Theme;
  themeForm!: UntypedFormGroup;

  constructor(private themesService: ThemesService, 
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    const themeId = +this.route.snapshot.params['themeId'];
    this.themeForm = this.formBuilder.group({
      name: [null, Validators.required], 
      id: themeId
    })
    this.themesService.getThemeById(themeId).subscribe(theme => {
        this.theme = theme;
        this.themeForm.setValue({name: this.theme.name, id: themeId});
      }
    )
  }

  goBack(): void{
    const themeId = +this.route.snapshot.params['themeId'];
    const contentBlockId = +this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/contentBlocks`);
  }

  onSubmitForm(): void {
    const themeId = +this.route.snapshot.params['themeId'];
    const contentBlockId = +this.route.snapshot.params['id'];
    this.themesService.editThemeName(this.themeForm.value).pipe(
      tap(() => this.router.navigateByUrl(`/contentBlocks`))
    ).subscribe();
  }

}
