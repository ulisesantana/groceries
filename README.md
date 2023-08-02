# groceries

Groceries is the app I use with my girlfriend for handling our groceries list. The first prototype was a Notion document, but with the time I decided to use what we learned by using it and create our own app. It's an offline first web app. The idea is to use it with a CouchDB database and share the URL with API Key among users. Right now we are using a [Cloudant](https://www.ibm.com/products/cloudant) instance on IBM Cloud with the free tier. If you are using this only by yourself you can use it without connecting it to anywhere. It will save all the data in your device and as soon as you add a database to sync, it will sync everything. This is only in case you want to share your groceries list with somebody or having the list across your devices.

Maybe this will look a little bit odd. However, in this way you are the owner of your data. This app has no servers, and it will work offline. I don't collect any data, and you need to provide the database in case you want this app to sync data across your devices. 

## How to create a Cloudant 