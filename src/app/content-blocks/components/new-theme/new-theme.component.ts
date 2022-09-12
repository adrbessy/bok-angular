import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Theme } from 'src/app/core/models/bok.model';
import { ContentBlocksService } from 'src/app/core/services/content-blocks.service';
import { ThemesService } from 'src/app/core/services/themes.service';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.scss']
})
export class NewThemeComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder,
    private themesService: ThemesService,
    private contentBlockService: ContentBlocksService,
    private router: Router,
    private route: ActivatedRoute) { }

  themeForm!: UntypedFormGroup;
  themes!: Theme[];

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
    ).subscribe(
      (result) =>
      this.themesService.getAllThemes().subscribe(
        (themes) =>
        {
          this.themes = themes;
          this.contentBlockService.addContentBlockBis(  
            ({
            id: 0,
            themeId: Math.max.apply(Math, this.themes.map(function(o) { return o.id; })),
            title: "Résumé",
            content: "",
            createdDate: new Date(),
            sort: 1 
            })
          ).subscribe();
          this.contentBlockService.addContentBlockBis(  
            ({
            id: 0,
            themeId: Math.max.apply(Math, this.themes.map(function(o) { return o.id; })),
            title: "Données",
            content: "",
            createdDate: new Date(),
            sort: 0 
            })
          ).subscribe()
        },
        (error) => {
          console.log('Erreur !' + error);
        }
      ),
      (error) => {
        console.log('Erreur !' + error);
      }
    );
  }

  onCancel(): void{
    this.router.navigateByUrl(`/contentBlocks`);
  }

}
