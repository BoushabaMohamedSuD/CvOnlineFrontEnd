

export class Style {
  private style: { navbar: string, input: string };
  constructor() {
    this.style = { navbar: 'span1', input: 'input1' };
  }

  ChangeStyleService(style: { navbar: string, input: string }): { navbar: string, input: string } {
    this.style = style;
    return style;
  }
  GetStyleService(): { navbar: string, input: string } {
    return this.style;
  }


}
