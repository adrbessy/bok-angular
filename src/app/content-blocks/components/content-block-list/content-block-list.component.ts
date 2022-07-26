import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { EMPTY, from, Observable } from 'rxjs';
import { ContentBlock } from 'src/app/core/models/bok.model';
import { ContentBlocksService } from 'src/app/core/services/content-blocks.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-content-block-list',
  templateUrl: './content-block-list.component.html',
  styleUrls: ['./content-block-list.component.scss']
})
export class ContentBlockListComponent implements OnInit {

  contentBlocks$!: Observable<ContentBlock[]>;
  contentBlocks!: ContentBlock[];

  constructor(private contentBlocksService: ContentBlocksService, private route: ActivatedRoute) { 
    route.params.subscribe((val) => {
      const themeId = +this.route.snapshot.params['themeId']
      if(themeId == 0){
        this.contentBlocks = [];
      }
      if(themeId){
        this.contentBlocksService.getContentBlocksByThemeId(themeId).subscribe(contentBlocks => {
          this.contentBlocks = contentBlocks.sort(this.compare);
        });
      }
    })
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<ContentBlock[]>) {
    for(var index in this.contentBlocks){
      console.log(this.contentBlocks[index]);
    }
    console.log('event.previousIndex : ' + event.previousIndex);
    console.log('event.currentIndex : ' + event.currentIndex);
    moveItemInArray(this.contentBlocks, event.previousIndex, event.currentIndex);
    for(var index in this.contentBlocks){
      console.log(this.contentBlocks[index]);
    }
    //always, recalculate the order of the container (the list to drag)
    this.contentBlocks.forEach((x,index)=>{
      x.sort=-index
    })
    for(var index in this.contentBlocks){
      console.log(this.contentBlocks[index]);
    }
    this.contentBlocksService.deleteByThemeId(this.contentBlocks[0].themeId);
    this.contentBlocksService.saveContentBlocks(this.contentBlocks);
  }

  compare( a: ContentBlock, b: ContentBlock ) {
    if ( a.sort < b.sort ){
      return 1;
    }
    if ( a.sort > b.sort ){
      return -1;
    }
    return 0;
  }
  
}
