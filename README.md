# MCDM_ServerSide_MongoDB
MCDM_ServerSide_MongoDB

1. [Overordnet Server Projekt](#overordnet)
2. [MongoDB Install](#mongodbInstall)   
    2.1 [Win Install](#mongodbWinInstall)   
    2.2 [Mac Install](#mongodbMacInstall)   
3. [Snippets](#snippet)     
    3.1 [Snippets - Farverkode](#snippetFarve)           
4. [Expo/React-native](#expo) 

## 1. Overordnet Server Projekt. <a name="overordnet"></a>

Dette projekt indholder nu.

1. Et finale API server projekt til vores endpoints.
2. Et finale klient server projekt til at tilgå vores Server 1.

Begge projekter indeholder en zip fil med hele projektet.

Husk at benytte ```npm install``` hvis du henter og udpakker zippen.

Herefter benyt kommandoen ```node index``` for at få serverne op at køre

## 2. MongoDB Install <a name="mongodbInstall"></a>

### 2.1 Windows Install <a name="mongodbWinInstall"></a>
[Windows - MongoDB Install](https://www.mongodb.com/try/download/community)

På følgende link vælger du "on-premises".
Herefter vælger man download i venstre side og henter "msi" udgaven.

Denne installation skal der bare siges next, next, next til. Herefter er Både MongoDB og Compass installeret. Det vil altid være godt med en genstarter herefter.

Nå maskinenen er genopstartet. Tryk windows og søg på Mongodb og Compass vil fremkomme.

### 2.2 Mac Install. <a name="mongodbMacInstall"></a>

Det er en to-trins process på Mac. Man skal installere mongoDB og Compass.

[Mac - MongoDB Install](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

[Mac - MongoDB Compass (Gui for MongoDB)](https://docs.mongodb.com/compass/current/install/)

**MacOS start/stop MonGO DB Services.**

Start:
``` brew services start mongodb-community@5.0 ```

Stop
``` brew services stop mongodb-community@5.0```

Herefter kan man starte Compass.

## 3. Snippets <a name="snippet"></a>

### 3.1 Farvekode til Consollen i nodejs. <a name="snippetFarve"></a>

Farvekoden '\x1b[32m%s\x1b[0m' = grøn.

Det er tallet "32" der afgøre farven prøv at ændre til f.eks. 34


``` 
console.log('\x1b[32m%s\x1b[0m','Noget vi skriver til consollen');
```

## 4. Expo/React-native <a name="expo"></a>

Vi benytter et sammenspil imellem Expo og React Native til at udvikle vores app.

Når man benytter denne fremgangsform skal man ikke kende/benytter Mac´s xcode eller Android Studio men du benytter react-native og expo´s bibliotek.

Dette giver lidt mindre magt over den enekelte platform og der vil også være nogle ting du ikke vil kunne udføre men alle de mest basale ting er rigeligt tilgængeligt.

Derfor installere vi først expo-cli (expo command line interface) hvorigennem vi kan oprette en basis standard app.

Hertil skal vi på vores Android eller iPhone installere expo appen til at hjælpe med at teste vores App.


### 4.1 Referencer

[Expo - App Installation](https://docs.expo.dev/get-started/installation/)

**Global Installing of expo-cli**   
``` 
npm install --global expo-cli 
```
