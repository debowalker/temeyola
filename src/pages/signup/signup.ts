import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import {AngularFireLiteAuth, AngularFireLiteDatabase, AngularFireLiteFirestore} from 'angularfire-lite';
import {Md5} from 'ts-md5/dist/md5';

// import { User } from '../../providers/providers';
// import { MainPage } from '../pages';

//providers
// import {UsersProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  //Error message controls
  emptyFullNameError=[]
  emptyUserNameError=[]
  emptyEmailError=[]
  emptyPasswordError=[]
  unMatchPasswordError=[]
  //Success message controls
  successMessage=[]
  //Schema Variables
  documentId:string
  databaseData;
  databaseList;
  databaseQuery;

  firestoreData;
  firestoreList;
  firestoreQuery;

  authState;
  duplicateUserName=[]
  duplicateEmail=[]

  accountDetail: { fullName: string, email: string, password: string,confirmPassword:string, userName:string,
             userType:string,phone:string,nativeLanguage:string,gender:string,
            dateOfBirth:string} = {
              fullName: '',
              email: '',
              password: '',
              confirmPassword:"",
              userName:"",
              userType:"normal",
              phone:"+256",
              nativeLanguage:"",
              gender:"Male",
              dateOfBirth:""

            };


  constructor(public db: AngularFireLiteDatabase,
              public auth: AngularFireLiteAuth,
              public firestore: AngularFireLiteFirestore,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public translateService: TranslateService) {
  }

  doSignup() {
    this.emptyFullNameError=[]
    this.emptyUserNameError=[]
    this.emptyEmailError=[]
    this.emptyPasswordError=[]
    this.unMatchPasswordError=[]
    this.successMessage=[]
    if (this.accountDetail.fullName.trim().length!=0){
      if (this.accountDetail.userName.trim().length!=0){
        if (this.accountDetail.email.trim().length!=0){
          if (this.accountDetail.password.trim().length!=0){
            if (this.accountDetail.password==this.accountDetail.confirmPassword){
              let retrievedUsers:any
              this.firestore.query("Users").on().subscribe((data) => {
                      retrievedUsers = data;
                  });
              for (let a0 of retrievedUsers){
                if (a0.userName==this.accountDetail.userName){
                  let atomicUser={fullName:a0.fullName,dateOfBirth:a0.dateOfBirth,
                              gender:a0.gender,nativeLanguage:a0.nativeLanguage,
                              phone:a0.phone,email:a0.email,
                              userName:a0.userName,password:a0.password,userType:a0.userType
                            }
                  this.duplicateUserName.push(atomicUser)
                }else if (a0.email==this.accountDetail.email){
                  let atomicUser={fullName:a0.fullName,dateOfBirth:a0.dateOfBirth,gender:a0.gender,nativeLanguage:a0.nativeLanguage,
                                  phone:a0.phone,email:a0.email,userName:a0.userName,password:a0.password,userType:a0.userType}
                  this.duplicateEmail.push(atomicUser)
                }

              }
              if (this.duplicateEmail.length==0 && this.duplicateUserName.length==0){
                console.log("by passed")
                let hashed=Md5.hashStr(this.accountDetail.password)
                this.generateDocumentId()
                let toSubmit={fullName:this.accountDetail.fullName,dateOfBirth:this.accountDetail.dateOfBirth,
                              gender:this.accountDetail.gender,nativeLanguage:this.accountDetail.nativeLanguage,
                              phone:this.accountDetail.phone,email:this.accountDetail.email,
                              userName:this.accountDetail.userName,password:hashed,userType:this.accountDetail.userType
                            }
                this.firestore.write("Users/"+this.documentId,toSubmit).subscribe(()=>{

                                                      })
                this.successMessage=[1,2]
                this.accountDetail = {
                            fullName: '',
                            email: '',
                            password: '',
                            confirmPassword:"",
                            userName:"",
                            userType:"normal",
                            phone:"+256",
                            nativeLanguage:"Lugbarati",
                            gender:"Male",
                            dateOfBirth:""

                          };
                this.emptyFullNameError=[]
                this.emptyUserNameError=[]
                this.emptyEmailError=[]
                this.emptyPasswordError=[]
                this.unMatchPasswordError=[]
              }
            }else{
              this.unMatchPasswordError=[1,2]
            }

            }else{
              this.emptyPasswordError=[1,2]
            }
          }else{
            this.emptyEmailError=[1,2]
          }
      }else {
        this.emptyUserNameError=[1,2]
      }
    }else {
      this.emptyFullNameError=[1,2]
    }

  }
  generateDocumentId(){
    while (true) {
        let documentId0=Math.random().toString(36).substr(2)
        let documentId1=Math.random().toString(36).substr(2)
        let documentId=`${documentId0+documentId1}`
        let documentIdCheck
        this.firestore.query(`temeyola/Users/${documentId}`).on().subscribe((data) => {
                documentIdCheck = data;
            });
        if (documentIdCheck.length==0) {
          this.documentId=documentId
          break

        }
    }

  }
login() {
  this.navCtrl.push('LoginPage');
}
}
