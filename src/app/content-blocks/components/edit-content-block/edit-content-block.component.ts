import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentBlock } from 'src/app/core/models/bok.model';
import { ContentBlocksService } from 'src/app/core/services/content-blocks.service';
import { ThemesService } from 'src/app/core/services/themes.service';
import { tap } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { NotifierService } from 'angular-notifier';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  selector: 'app-edit-content-block',
  templateUrl: './edit-content-block.component.html',
  styleUrls: ['./edit-content-block.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditContentBlockComponent implements OnInit {

  themeName!: string;
  themeId!: number;
  contentBlockForm!: UntypedFormGroup;
  contentBlock!: ContentBlock;
  contentBlocks!: ContentBlock[];
  canEditCode!: Boolean;
  notifier!: NotifierService;
  isLoaded!: Boolean;

  constructor(private contentBlocksService: ContentBlocksService,
    private formBuilder: UntypedFormBuilder,
    private themesService: ThemesService,
    private route: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService) { 
      this.notifier = notifierService;
      this.isLoaded = false;
    }

  ngOnInit(): void {
    console.log("bonjour")
    this.route.params.subscribe(params => {
      this.isLoaded = false;
      console.log("bonjour2")
      // PARAMS CHANGED .. TO SOMETHING REALLY COOL HERE ..
      let themeId = +params['themeId']; // (+) converts string 'id' to a number
      let contentBlockId = +params['id'];
      console.log("themeId : " + themeId);
      console.log("contentBlockId : " + contentBlockId);
      this.themesService.getThemeById(themeId).subscribe(theme => {
        this.themeName = theme.name;
        this.themeId = theme.id;
      })
      console.log("this.isLoaded : " + this.isLoaded);
      this.contentBlocksService.getContentBlockById(contentBlockId).subscribe(contentBlock => {
          this.contentBlock = contentBlock;
          console.log("contentBlock : " + contentBlock);
          this.contentBlockForm = this.formBuilder.group({
            title: [this.contentBlock.title, Validators.required], 
            content: this.contentBlock.content,
            themeId : themeId,
            id: contentBlockId
          })
          //this.contentBlockForm.setValue({title: this.contentBlock.title, content: this.contentBlock.content, themeId: themeId, id: contentBlockId});

          console.log("this.contentBlockForm.getRawValue() : " + this.contentBlockForm.getRawValue());
          this.isLoaded = true;
          console.log("this.isLoaded : " + this.isLoaded);
      })
      console.log("this.contentBlockForm : " + this.contentBlockForm);
      this.contentBlocksService.getContentBlocksByThemeId(themeId).subscribe(contentBlocks => {
        this.contentBlocks = contentBlocks;
      });
      console.log("bonjour3")
    });
    CKEDITOR.config.height = "350px";
    CKEDITOR.config.removeButtons = 'Source,Save,NewPage,ExportPdf,Preview,Print,Cut,Copy,Paste,Templates,PasteText,PasteFromWord,Undo,Redo,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Replace,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,NumberedList,BulletedList,Outdent,Indent,Blockquote,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Unlink,Anchor,Smiley,SpecialChar,Table,PageBreak,Iframe,Styles,Format,ShowBlocks,About';  
  }

  goBack(): void{
    const themeId = +this.route.snapshot.params['themeId'];
    this.router.navigateByUrl(`/contentBlocks/theme/${themeId}`);
  }

  onSubmitForm(): void {
    const themeId = +this.route.snapshot.params['themeId'];
    const contentBlockId = +this.route.snapshot.params['id'];
    this.contentBlocksService.updateContentBlock(this.contentBlockForm.value).pipe(
      tap(() => this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${contentBlockId}/edit`))
    ).subscribe(
      (reponse) =>
      {
        this.notifier.notify('success', 'Contenu sauvegardé !');
      },
      (error) => {
        console.log('Erreur !' + error);
      }
    );
  }

  onSubmitTitle(): void {
    const themeId = +this.route.snapshot.params['themeId'];
    const contentBlockId = +this.route.snapshot.params['id'];
    this.contentBlocksService.updateContentBlock(this.contentBlockForm.value).pipe(
      tap(() => this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${contentBlockId}/edit`))
    ).subscribe(
      (reponse) =>
      {
        location.reload();
      },
      (error) => {
        console.log('Erreur !' + error);
      }
    );
  }

  onEditContentBlock(contentBlockId: number){
    const themeId = +this.route.snapshot.params['themeId'];
    /*this.contentBlocksService.updateContentBlock(this.contentBlockForm.value).pipe(
      tap(() => this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${contentBlockId}/edit`))
    ).subscribe(
      (reponse) =>
      {
        location.reload();
      },
      (error) => {
        console.log('Erreur !' + error);
      }
    );*/
    this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${contentBlockId}/edit`)
  }

 /* onChange(event: any): void {
    console.log(event);
    this.contentBlocksService.updateContentBlock(this.contentBlockForm.value)
    //this.log += new Date() + "<br />";
  }*/

}
