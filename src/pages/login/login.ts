import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators,FormBuilder,FormGroup } from "@angular/forms";
import { HomePage } from '../home/home';
import { DataService } from '../../providers/data-service';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [DataService]  //DataService deve instanciar sempre
  //não posso ter o userService aqui pq ele tem que ser um singleton
})
export class LoginPage {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,    
    public dataService: DataService,
    public userService: UserService,
    public alertCtrl: AlertController
  ) {

      this.form = this.fb.group({
        username: ['',Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required
        ])],
        password: ['',Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ])]
      });

      //se o cara estiver logado(tiver um token), redireciono
      if (this.userService.authenticate()) {
        this.navCtrl.setRoot(HomePage);
      }
  }

  ionViewDidLoad() {
    
  }

  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Autenticando...'
    });
  
    loading.present(); //mostra o loading na tela

    // setTimeout(() => {
    //   loading.dismiss();
    //   this.navCtrl.setRoot(HomePage); //nesse caso, não quero histórico pq não faz sentido ele logar e voltar para a página de login novamente  }
    // },1500);


    this.dataService.authenticate(this.form.value)
    .subscribe(data => {
      loading.dismiss();
      //se der certo, mando salvar o meu data.user e o meu token
      //this.userService.save(data.user, data.token);
      this.userService.save({ id:data.user.id, name: data.user.name, image: data.user.image }, data.token);
      this.navCtrl.setRoot(HomePage);
    } 
    , error =>{
      loading.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Ops, algo deu errado...',
          subTitle:"Login e senha inválidos",
          //subTitle: JSON.parse(error._body).message,
          buttons:['OK']
      });
      alert.present();
      //loading.present(); //mostra o loading na tela
    }
  );

  }

}
