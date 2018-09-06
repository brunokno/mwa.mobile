import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { CartService } from '../../providers/cart-service';
import { ProductDetailsPage } from '../product-details/product-details';
import { DataService } from '../../providers/data-service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[DataService]
})
export class HomePage {
  public items: any[] = [];
  public products: any[] = [];
  public token: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public cartService: CartService,
    public dataService:DataService
    ) {

      //Quando o carrinho mudar, notificar a aplicação  
      this.cartService.getMessage().subscribe((data) => {
        this.items = this.cartService.items;
      });
  }


  ionViewDidLoad() {
    this.getProducts();
    // this.products.push({ id: 5788, title: 'Mouse', description: 'Mouse de alta performance para quem está buscando alto desempenho nos games!', image: 'https://picsum.photos/128/128/', price: 299.90 });
    // this.products.push({ id: 5789, title: 'Teclado', description: ' ', image: 'https://picsum.photos/128/128/', price: 399.90 });
    // this.products.push({ id: 5882, title: 'Monitor', description: ' ', image: 'https://picsum.photos/128/128/', price: 1499.90 });
    // this.products.push({ id: 2314, title: 'Caixas Acústicas', description: '', image: 'https://picsum.photos/128/128/', price: 399.90 });
    // this.products.push({ id: 5506, title: 'Mouse Pad', description: ' ', image: 'https://picsum.photos/128/128/', price: 29.90 });
  }

  getProducts(){
    this.dataService
        .getProducts()
        .subscribe((data)=>{
            this.products = data;
    })
  } 

  showDetails(product){
    let modal = this.modalCtrl.create(ProductDetailsPage, {product:product});//{product:product}  - pq é chave e valor
    modal.present();
  }

  addToCart(slidingItem, product){
    this.cartService.addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity:1
    });

    slidingItem.close();
    let toast = this.toastCtrl.create({
      message: 'Produto aicionado ao carrinho',
      duration: 1500,
      position:'top'
    });

    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });

    toast.present();
  }

}
