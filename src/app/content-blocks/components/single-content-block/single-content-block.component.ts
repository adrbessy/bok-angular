import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentBlock } from 'src/app/core/models/bok.model';
import { ContentBlocksService } from 'src/app/core/services/content-blocks.service';
import { ThemesService } from 'src/app/core/services/themes.service';


@Component({
  selector: 'app-single-content-block',
  templateUrl: './single-content-block.component.html',
  styleUrls: ['./single-content-block.component.scss']
})
export class SingleContentBlockComponent implements OnInit{

  contentBlock$!: Observable<ContentBlock>;
  contentBlock!: ContentBlock;
  htmlString!: SafeHtml;
  contentBlocks!: ContentBlock[];
  themeName!: string;

  constructor(private contentBlocksService: ContentBlocksService,
    private themesService: ThemesService,
    private route: ActivatedRoute, private router: Router,
    private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let themeId = +params['themeId']; // (+) converts string 'id' to a number
      let contentBlockId = +params['id'];
      this.contentBlocksService.getContentBlockById(contentBlockId).subscribe(contentBlock => {
        this.contentBlock = contentBlock;
        this.htmlString = this.sanitizer.bypassSecurityTrustHtml(contentBlock.content)
      })
      this.contentBlocksService.getContentBlocksByThemeId(themeId).subscribe(contentBlocks => {
        this.contentBlocks = contentBlocks;
      });
      this.themesService.getThemeById(themeId).subscribe(theme => {
        this.themeName = theme.name;
      })
    })
  }

  goBack(): void{
    const themeId = +this.route.snapshot.params['themeId'];
    this.router.navigateByUrl(`/contentBlocks/theme/${themeId}`);
  }

  edit(): void{
    const themeId = +this.route.snapshot.params['themeId'];
    const contentBlockId = +this.route.snapshot.params['id'];
    this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${contentBlockId}/edit`);
  }

  onShowContentBlock(contentBlockId: number){
    const themeId = +this.route.snapshot.params['themeId'];
    this.router.navigateByUrl(`/contentBlocks/theme/${themeId}/${contentBlockId}`);
  }

}
