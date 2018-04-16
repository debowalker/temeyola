import { Country,Language } from '../model/model';
export class FormatLanguageForTranslationLanguageMenu {

  public mes0:Object[]=[]

  constructor(translation,country:Country[],language:Language[]) {
    for(let a0 of language){
      let countries=[]
      for (let b0 of a0.countryId){
        for (let c0 of country){
          if(c0.countryId==b0){
            countries.push(c0.country)
          }
        }
      }
      console.log(countries)
      let userNames=[]
      for (let b0 of translation){
        if (a0.languageId==b0.languageId){
          if (b0.userName in userNames){

          }else{
            userNames.push(b0.userName)
          }
        }
      }
      console.log(userNames)
      this.mes0.push({languageId:a0.languageId,language:a0.language,languageDescription:a0.languageDescription,
                      countries:countries,translators:userNames.length})
    }

  }

}
