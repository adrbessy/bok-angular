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
    this.route.params.subscribe(params => {
      this.isLoaded = false;
      // PARAMS CHANGED .. TO SOMETHING REALLY COOL HERE ..
      let themeId = +params['themeId']; // (+) converts string 'id' to a number
      let contentBlockId = +params['id'];
      this.themesService.getThemeById(themeId).subscribe(theme => {
        this.themeName = theme.name;
        this.themeId = theme.id;
      })
      this.contentBlocksService.getContentBlockById(contentBlockId).subscribe(contentBlock => {
          this.contentBlock = contentBlock;
          this.contentBlockForm = this.formBuilder.group({
            title: [this.contentBlock.title, Validators.required], 
            content: this.contentBlock.content,
            themeId : themeId,
            id: contentBlockId
          })
          this.isLoaded = true;
      })
      this.contentBlocksService.getContentBlocksByThemeId(themeId).subscribe(contentBlocks => {
        this.contentBlocks = contentBlocks;
      });
    });
    CKEDITOR.config.height = "650px";
    //CKEDITOR.config.removeButtons = 'Source,Save,NewPage,ExportPdf,Preview,Print,Cut,Copy,Paste,Templates,PasteText,PasteFromWord,Undo,Redo,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Replace,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,NumberedList,BulletedList,Outdent,Indent,Blockquote,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Unlink,Anchor,Smiley,SpecialChar,Table,PageBreak,Iframe,Styles,Format,ShowBlocks,About';  
    CKEDITOR.config.fontSize_defaultLabel = '16px';
    CKEDITOR.addCss(".cke_editable{cursor:text; font-size: 16px; font-family: Arial, sans-serif;}");
    CKEDITOR.addCss('.cke_editable { background-color: #2E3943; color: white }');
    CKEDITOR.config.toolbar = [
      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline' ] },
      { name: 'styles', items: ['Font', 'FontSize' ] },
      { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
      { name: 'tools', items: [ 'Maximize'] }
    ];
    CKEDITOR.config.removePlugins = 'elementspath';
    CKEDITOR.config.resize_enabled = false;
  }

  goBack(): void{
    const themeId = +this.route.snapshot.params['themeId'];
    this.contentBlocksService.updateContentBlock(this.contentBlockForm.value).pipe(
      tap(() => this.router.navigateByUrl(`/contentBlocks/theme/${themeId}`))
    ).subscribe(
      (reponse) =>
      {},
      (error) => {
        console.log('Erreur !' + error);
      }
    );
    //this.router.navigateByUrl(`/contentBlocks/theme/${themeId}`);
  }

  onShowContentBlock(){
    const themeId = +this.route.snapshot.params['themeId'];
    this.router.navigateByUrl(`contentBlocks/theme/${themeId}/${this.contentBlock.id}`);
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
    this.contentBlocksService.updateContentBlock(this.contentBlockForm.value).pipe(
      tap(() => this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${contentBlockId}/edit`))
    ).subscribe(
      (reponse) =>
      {
      },
      (error) => {
        console.log('Erreur !' + error);
      }
    );
  }

 onChange(event: any): void {
    console.log(event);
    this.contentBlocksService.updateContentBlock(this.contentBlockForm.value).subscribe(
      (reponse) =>
      {},
      (error) => {
        console.log('Erreur !' + error);
      }
    );
  }

}
