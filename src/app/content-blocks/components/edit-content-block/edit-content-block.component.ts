import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentBlock } from 'src/app/core/models/bok.model';
import { ContentBlocksService } from 'src/app/core/services/content-blocks.service';
import { ThemesService } from 'src/app/core/services/themes.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-content-block',
  templateUrl: './edit-content-block.component.html',
  styleUrls: ['./edit-content-block.component.scss']
})
export class EditContentBlockComponent implements OnInit {

  themeName!: string;
  contentBlockForm!: UntypedFormGroup;
  contentBlock!: ContentBlock;

  constructor(private contentBlocksService: ContentBlocksService,
    private formBuilder: UntypedFormBuilder,
    private themesService: ThemesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const themeId = +this.route.snapshot.params['themeId'];
    const contentBlockId = +this.route.snapshot.params['id'];
    this.themesService.getThemeById(themeId).subscribe(theme => 
      {this.themeName = theme.name;}
    )
    this.contentBlockForm = this.formBuilder.group({
      title: [null, Validators.required], 
      content: [null],
      themeId : themeId,
      id: contentBlockId
    })
    this.contentBlocksService.getContentBlockById(contentBlockId).subscribe(contentBlock => 
      {this.contentBlock = contentBlock;
        this.contentBlockForm.setValue({title: this.contentBlock.title, content: this.contentBlock.content, themeId: themeId, id: contentBlockId});
      })
  }

  goBack(): void{
    const themeId = +this.route.snapshot.params['themeId'];
    const contentBlockId = +this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${contentBlockId}`);
  }

  onSubmitForm(): void {
    const themeId = +this.route.snapshot.params['themeId'];
    const contentBlockId = +this.route.snapshot.params['id'];
    this.contentBlocksService.updateContentBlock(this.contentBlockForm.value).pipe(
      tap(() => this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${contentBlockId}`))
    ).subscribe();
  }

}
