import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  public product: any={};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController  //representa a própria view
  ) {
    console.log(this.product);
    this.product = this.navParams.get('product');    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductDetailsPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
