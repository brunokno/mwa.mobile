import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CartPage } from '../pages/cart/cart';
import { LoginPage } from '../pages/login/login';

import { UserService } from '../providers/user-service';
import { CartService } from '../providers/cart-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public user: any;
  public items: any[] = [];

  rootPage: any = LoginPage; //Defino o login como página inicial

  pages: Array<{ icon: string, title: string, component: any }>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public userService: UserService,
    public cartService: CartService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon:'home', title: 'Home', component: HomePage },
      //{ title: 'List', component: ListPage },
      //{ icon:'lock', title:'Carrinho', component: CartPage}
    ];

    //a cada vez que meu userService mudar, vou buscar o usuário que está logado
    this.userService.getMessage().subscribe((data) => {
      this.user = this.userService.loadUser();
    });

    //a cada vez que meu cart mudar, vou buscar o usuário que está logado
    this.cartService.getMessage().subscribe((data) => {
      this.items = this.cartService.items;
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToCart() {
    this.nav.setRoot(CartPage);
  }

  logout(){
    this.userService.logout();
    this.nav.setRoot(LoginPage);
  }

}
