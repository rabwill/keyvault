import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as KeyVault  from 'azure-keyvault';
import * as msRestAzure from 'ms-rest-azure';

     var clientId = "2e3a6c2b-d329-4bc2-91c6-5bde832ace80";
     var clientSecret = "*4]i8-29at*2KEBsNE3yekwUSh]]WXRI";  
     var secretName="mysupersecretkey";
     var secretVersion="d635a71eb66f4794a3bd91a33db73fec";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    if (name) {
     // The ms-rest-azure library allows us to login with MSI by providing the resource name. In this case the resource is Key Vault.
// For public regions the resource name is Key Vault
msRestAzure.loginWithServicePrincipalSecret(clientId,clientSecret,"rabia-keyvault-demo").then( (credentials) => {
    const keyVaultClient = new KeyVault.KeyVaultClient(credentials);
   var vaultUri = "https://" + "rabia-keyvault-demo." + ".vault.azure.net/"; 
        return keyVaultClient.getSecret(vaultUri,secretName,secretVersion)        
        .then((bundle) => {
            console.log("Successfully retrieved 'test-secret'");
            console.log(bundle);
        })
        .catch( (err) => {
            console.log(err);
        });

    // Below code demonstrates how to retrieve a secret value
    
    // keyVaultClient.getSecret(vaultUri, "AppSecret", "").then(function(response){
    //     console.log(response);    
    // })
});



// Authenticator - retrieves the access token

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};




export default httpTrigger;
