import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentBlockComponent } from './components/content-block/content-block';
import { ContentBlocksAndThemesComponent } from './components/content-blocks-and-themes/content-blocks-and-themes.component';
import { NewContentBlockComponent } from './components/new-content-block/new-content-block.component';
import { ContentBlockListComponent } from './components/content-block-list/content-block-list.component';
import { SingleContentBlockComponent } from './components/single-content-block/single-content-block.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeComponent } from './components/theme/theme.component';
import { CoreModule } from '../core/core.module';
import { ThemeListComponent } from './components/theme-list/theme-list.component';
import { ContentBlocksRoutingModule } from './content-blocks-routing.module';
import { ShortenPipe } from './pipes/shorten.pipe';
import { timeAgoPipe } from './pipes/time-ago.pipe';
import { NewThemeComponent } from './components/new-theme/new-theme.component';
import { MatIconModule } from '@angular/material/icon';
import { ReversePipe } from './pipes/reverse.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditContentBlockComponent } from './components/edit-content-block/edit-content-block.component'; 
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatMenuModule } from '@angular/material/menu';
import { EditThemeComponent } from './components/edit-theme/edit-theme.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    ContentBlockComponent,
    ContentBlocksAndThemesComponent,
    NewContentBlockComponent,
    ContentBlockListComponent,
    SingleContentBlockComponent,
    ThemeComponent,
    ThemeListComponent,
    ShortenPipe,
    timeAgoPipe,
    NewThemeComponent,
    ReversePipe,
    EditContentBlockComponent,
    EditThemeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContentBlocksRoutingModule,
    CoreModule,
    MatIconModule,
    DragDropModule,
    HttpClientModule, 
    FormsModule,
    CKEditorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatTabsModule
  ],
  exports: [
    ContentBlockComponent,
    ContentBlocksAndThemesComponent,
    NewContentBlockComponent,
    ContentBlockListComponent,
    SingleContentBlockComponent,
    ThemeComponent,
    ThemeListComponent,
    ShortenPipe,
    timeAgoPipe,
    ReversePipe 
  ]
})
export class ContentBlocksModule { }
