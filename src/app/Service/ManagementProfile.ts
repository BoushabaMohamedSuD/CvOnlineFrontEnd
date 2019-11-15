import { MatDrawer } from '@angular/material';

export class ManagementMakeProfile {
    private GeneralKleProfile: boolean;
    private kleMakeProfile: number;
    private kelTitle: boolean;
    private inputActiveValue: string;
    public Cvs: { title: string, kleActive: boolean }[];
    private KleUrlImage: boolean;
    private UrlImage: [{ url: string }];
    private kleUpdatecv: boolean;
    public srcImage: { cvId: number, src: string }[];
    private Drawer: MatDrawer;
    private DrawerMode: string;
    private DrawerKey: boolean;
    constructor() {
        this.GeneralKleProfile = false;
        this.kleMakeProfile = 0;
        this.kelTitle = false;
        this.Cvs = new Array();
        this.inputActiveValue = '';
        this.KleUrlImage = false;
        this.kleUpdatecv = false;
        this.srcImage = new Array();
        this.Drawer = null;
        this.DrawerKey = false;
        this.DrawerMode = 'push';
    }
    SetDrawerMode(drawer: string) {

        this.DrawerMode = drawer;
    }
    GetDrawerMode(): string {

        return this.DrawerMode;
    }
    SetDrawerKey(drawer: boolean) {

        this.DrawerKey = drawer;
    }
    GetDraweKeyr(): boolean {

        return this.DrawerKey;
    }
    SetDrawer(drawer: MatDrawer) {
        console.log('-------set darwer----');
        this.Drawer = drawer;
    }
    GetDrawer(): MatDrawer {
        console.log('-------get darwer----');
        return this.Drawer;
    }
    SetImageSrc(src: { cvId: number, src: string }[]) {
        this.srcImage = src;
    }
    GetImageSrc(): { cvId: number, src: string }[] {
        return this.srcImage;
    }
    SetKleGeneralProfile(Kle: boolean) {
        this.GeneralKleProfile = Kle;
    }
    GetKleGeneralProfile(): boolean {
        return this.GeneralKleProfile;
    }
    SetKleMakeProfile(Kle: number) {
        this.kleMakeProfile = Kle;
    }
    GetKleMakeProfile(): number {
        return this.kleMakeProfile;
    }
    SetKleTitle(kle: boolean) {
        this.kelTitle = kle;
    }
    GetKleTitle(): boolean {
        return this.kelTitle;
    }
    SetCvs(Cvs: { title: string, kleActive: boolean }[]) {
        this.Cvs = Cvs;
    }
    GetCvs(): { title: string, kleActive: boolean }[] {
        return this.Cvs;
    }
    SetInputActiveVlaue(value: string) {
        this.inputActiveValue = value;
    }
    GetInptActiveValue(): string {
        return this.inputActiveValue;
    }
    SetUrlImagePush(Url: { url: string }) {
        if (this.KleUrlImage) {
            this.UrlImage.push(Url);
        } else {
            this.UrlImage = [{ url: Url.url }];
            this.KleUrlImage = true;
        }

    }
    GetUrlIamge(): { url: string }[] {
        return this.UrlImage;
    }
    SetKleUpdateCv(kle: boolean) {
        this.kleUpdatecv = kle;
    }
    GetKleUpdateCv(): boolean {
        return this.kleUpdatecv;
    }





}
