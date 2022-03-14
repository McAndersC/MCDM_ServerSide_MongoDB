# MCDM_ServerSide_MongoDB
MCDM_ServerSide_MongoDB


## MongoDB Install


### Mac Install.

Det er en to-trins process på Mac. Man skal installere mongoDB og Compass.

[Mac - MongoDB Install](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

[Mac - MongoDB Compass (Gui for MongoDB)](https://docs.mongodb.com/compass/current/install/)

### MacOS start/stop MonGO DB Services.

Start:
``` brew services start mongodb-community@5.0 ```

Stop
``` brew services stop mongodb-community@5.0```

Herefter kan man starte Compass.


## Snippets

### Farvekode til Consollen i node.

Farvekoden '\x1b[32m%s\x1b[0m' = grøn.

Det er tallet "32" der afgøre farven prøv at ændre til f.eks. 34


``` 
console.log('\x1b[32m%s\x1b[0m','Noget vi skriver til consollen');
```
