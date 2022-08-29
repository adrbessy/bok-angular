import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ThemesService } from 'src/app/core/services/themes.service';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.scss']
})
export class NewThemeComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder,
    private themesService: ThemesService,
    private router: Router,
    private route: ActivatedRoute) { }

  themeForm!: UntypedFormGroup;

  ngOnInit(): void {
    const themeId = +this.route.snapshot.params['id'];
    this.themeForm = this.formBuilder.group({
      name: [null, Validators.required],
      parentId: themeId
    })
  }

  onSubmitForm(): void {
    this.themesService.addTheme(this.themeForm.value).pipe(
      tap(() => this.router.navigateByUrl('/contentBlocks'))
    ).subscribe();
  }

  onCancel(): void{
    this.router.navigateByUrl(`/contentBlocks`);
  }

}
