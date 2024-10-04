import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
declare const gapi: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [   HttpClientModule,  SocialLoginModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ SocialAuthService,{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('439126531747-ln1q9a3fb2jkda6no634evut1o16cm3c.apps.googleusercontent.com') // your client id
        }
      ]
    }
  }],
})
export class LoginComponent implements OnInit {

  loginObj: Login;
  auth2: any;
  constructor(private http: HttpClient,private router: Router,private authService: SocialAuthService,private ngZone: NgZone) {
    this.loginObj = new Login();
    this.authService.authState.subscribe((user) => {
      debugger;
    });
  }
  ngOnInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '439126531747-ln1q9a3fb2jkda6no634evut1o16cm3c.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  attachSignin(element:any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser:any) => {
        let profile = googleUser.getBasicProfile();
        this.ngZone.run(() => {
          // Call your service to authenticate on the backend
          console.log('Token || ' + googleUser.getAuthResponse().id_token);
        });
      }, (error:any) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
  onLogin() {
    
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(() =>  {
      debugger
    })
 
     
    debugger;
    // this.http.post('https://freeapi.gerasim.in/api/User/Login', this.loginObj).subscribe((res:any)=>{
    //   if(res.result) {
    //     alert("Login Success");
    //     localStorage.setItem('angular17token', res.data.token)
    //     this.router.navigateByUrl('/dashboard')
    //   } else {
    //     alert(res.message)
    //   }
    // })
  }
}

export class Login { 
    EmailId: string;
    Password: string;
    constructor() {
      this.EmailId = '';
      this.Password = '';
    } 
}
