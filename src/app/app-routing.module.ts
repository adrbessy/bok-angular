import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/components/landing-page/landing-page.component";

const routes: Routes = [
    {path: 'contentBlocks', loadChildren: () => import('./content-blocks/content-blocks.module').then(m => m.ContentBlocksModule) }, 
    {path: '', component: LandingPageComponent},
    /*{path: '**', redirectTo: ''}*/
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}