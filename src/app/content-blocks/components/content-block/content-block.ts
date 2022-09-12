import { Component, Input} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ContentBlock } from '../../../core/models/bok.model';
import { ContentBlocksService } from '../../../core/services/content-blocks.service';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.html',
  styleUrls: ['./content-block.scss']
})
export class ContentBlockComponent{
  
  @Input() contentBlock!: ContentBlock;
  htmlString!: SafeHtml;

  constructor(private contentBlocksService: ContentBlocksService,
    private router: Router, private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
      if(this.contentBlock.title=="Résumé"){
        this.htmlString = this.sanitizer.bypassSecurityTrustHtml(this.truncate(this.contentBlock.content,0, ""));
      }
      else{
        this.htmlString = this.sanitizer.bypassSecurityTrustHtml(this.truncate(this.contentBlock.content, 500, '&hellip;'));
      }
    }

  truncate(str: string, n: number, end: string){
      return (str.length > n) ? str.slice(0, n-1) + end : str;
    };

  onShowContentBlock(){
    const themeId = +this.route.snapshot.params['themeId'];
    this.router.navigateByUrl(`contentBlocks/theme/${themeId}/${this.contentBlock.id}`);
  }

  onMaximize(){
    this.htmlString = this.sanitizer.bypassSecurityTrustHtml(this.truncate(this.contentBlock.content,0, ""));
  }

  onMinimize(){
    this.htmlString = this.sanitizer.bypassSecurityTrustHtml(this.truncate(this.contentBlock.content,1, ""));
  }

  onDeleteContentBlock(){
    if(confirm("Are you sure to delete ?")) {
      const contentBlockId = +this.contentBlock.id;
      this.contentBlocksService.deleteContentBlock(contentBlockId).subscribe((reponse) =>
      {
        location.reload();
      },
      (error) => {
        console.log('Erreur !' + error);
      }
      );
    }
  }

  edit(): void{
    const themeId = +this.route.snapshot.params['themeId'];
    this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${this.contentBlock.id}/edit`);
  }

}
