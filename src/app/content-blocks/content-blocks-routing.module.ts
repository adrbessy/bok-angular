import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { ContentBlocksAndThemesComponent } from "./components/content-blocks-and-themes/content-blocks-and-themes.component";
import { EditContentBlockComponent } from "./components/edit-content-block/edit-content-block.component";
import { NewContentBlockComponent } from "./components/new-content-block/new-content-block.component";
import { NewThemeComponent } from "./components/new-theme/new-theme.component";
import { SingleContentBlockComponent } from "./components/single-content-block/single-content-block.component";

const routes: Routes = [
    {path: 'create/:themeId', component: NewContentBlockComponent, /*canActivate: [AuthGuard]*/},
    {path: 'createTheme', component: NewThemeComponent, /*canActivate: [AuthGuard]*/},
    {path: 'theme/:themeId/:id', component: SingleContentBlockComponent, /*canActivate: [AuthGuard]*/},
    {path: 'theme/:themeId/:id/edit', component: EditContentBlockComponent, /*canActivate: [AuthGuard]*/},
    {path: 'theme/:themeId', component: ContentBlocksAndThemesComponent, /*canActivate: [AuthGuard]*/},
    {path: '', component: ContentBlocksAndThemesComponent, /*canActivate: [AuthGuard]*/ }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ContentBlocksRoutingModule {}