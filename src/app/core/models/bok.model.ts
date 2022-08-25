export class ContentBlock{

    id!: number;
    themeId!: number;
    title!: string;
    content!: string;
    createdDate!: Date;
    sort!: number;
  
}

export class Theme{

    id!: number;
    name!: string;
    sort!: number;
}