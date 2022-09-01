import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentBlock } from 'src/app/core/models/bok.model';
import { ContentBlocksService } from 'src/app/core/services/content-blocks.service';
import { FormsModule } from '@angular/forms';
import { ThemesService } from 'src/app/core/services/themes.service';

@Component({
  selector: 'app-new-content-block',
  templateUrl: './new-content-block.component.html',
  styleUrls: ['./new-content-block.component.scss']
})
export class NewContentBlockComponent implements OnInit {

  contentBlockForm!: UntypedFormGroup;
  contentBlockPreview$!: Observable<ContentBlock>;  
  ckeditorContent!: any;
  themeName!: string;

  constructor(private formBuilder: UntypedFormBuilder,
              private contentBlocksService: ContentBlocksService,
              private themesService: ThemesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const themeId = +this.route.snapshot.params['themeId'];
    this.contentBlockForm = this.formBuilder.group({
      title: [null, Validators.required], 
      content: [null],
      themeId : themeId
    })
    this.contentBlockPreview$ = this.contentBlockForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createdDate: new Date(),
        id: 0,
        themeId: themeId
      }))
    );
    this.ckeditorContent = "";
    CKEDITOR.config.height = "350px";
    CKEDITOR.config.removeButtons = 'Source,Save,NewPage,ExportPdf,Preview,Print,Cut,Copy,Paste,Templates,PasteText,PasteFromWord,Undo,Redo,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Replace,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,NumberedList,BulletedList,Outdent,Indent,Blockquote,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Unlink,Anchor,Smiley,SpecialChar,Table,PageBreak,Iframe,Styles,Format,ShowBlocks,About';

    this.themesService.getThemeById(themeId).subscribe(theme => 
      {this.themeName = theme.name;}
    )
  }

  onSubmitForm(): void {
    const themeId = +this.route.snapshot.params['themeId'];
    this.contentBlocksService.addContentBlock(this.contentBlockForm.value).pipe(
      tap(() => this.router.navigateByUrl(`/contentBlocks/theme/${themeId}`))
    ).subscribe();
  }

  onCancel(): void{
    const themeId = +this.route.snapshot.params['themeId'];
    this.router.navigateByUrl(`/contentBlocks/theme/${themeId}`);
  }

}
