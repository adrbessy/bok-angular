import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-blocks-and-themes',
  templateUrl: './content-blocks-and-themes.component.html',
  styleUrls: ['./content-blocks-and-themes.component.scss']
})
export class ContentBlocksAndThemesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAddNewTheme(): void {
    this.router.navigateByUrl('contentBlocks/createTheme');
  }

}
