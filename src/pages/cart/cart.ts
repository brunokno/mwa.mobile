import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CartService } from '../../providers/cart-service';
import { HomePage } from '../home/home';
import { DataService } from '../../providers/data-service';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers:[DataService]
})
export class CartPage {
  public items: any[] = [];
  public discount: number = 0;
  public deliveryFee: number = 5;
  public subtotal: number=0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public cartService: CartService,
    public dataService: DataService,
    public alertCtrl: AlertController    
  ) {
    this.cartService.getItems();
    this.items = cartService.items;

    //this.items.push({ id: 5788, title: 'Mouse',  image: 'https://picsum.photos/128/128/', price: 299.90, quantity:1 });
    //this.items.push({ id: 5789, title: 'Teclado',  image: 'https://picsum.photos/128/128/', price: 399.90, quantity:1 });
    //this.items.push({ id: 5882, title: 'Monitor', image: 'https://picsum.photos/128/128/', price: 1499.90, quantity:1 });
    //this.items.push({ id: 2314, title: 'Caixas Acústicas',  image: 'https://picsum.photos/128/128/', price: 399.90, quantity:1 });
    //this.items.push({ id: 5506, title: 'Mouse Pad',  image: 'https://picsum.photos/128/128/', price: 29.90, quantity:1 });
  }

  ionViewDidLoad() {
    this.subtotal = this.cartService.getSubTotal();
  }

  checkout(){
    var user = JSON.parse(localStorage.getItem('mws.user'));
    var data = {
      customer: user.id,
      deliveryFee: this.deliveryFee,
      discount: this.discount,
      items: []
    };

    for(let i of this.cartService.items){
      data.items.push({
        product: i.id,
        quantity: i.quantity
      })
    }

    var request = JSON.stringify(data);

    this.dataService.createOrder(request)
      .subscribe(result =>{

        let prompt = this.alertCtrl.create({
          title:'Checkout',
          message: "Seu pedido foi realizado com sucesso e será enviado em breve!",    
          buttons:[       
            {
              text: 'OK',
              handler: data => {
                this.navCtrl.setRoot(HomePage);
              }
            }
          ]
        });
        prompt.present();

      }, error=>{

        let alert = this.alertCtrl.create({
          title: 'Ops, algo deu errado...',
          subTitle: JSON.parse(error._body).message,
          buttons:['OK']
        });
        alert.present();

      })


  }

}
