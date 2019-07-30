import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as KeyVault  from 'azure-keyvault';
import { AuthenticationContext } from "adal-node";
var authenticator = function(challenge, callback) {

    // Create a new authentication context.
    var context = new AuthenticationContext(challenge.authorization);

    var clientId = "2e3a6c2b-d329-4bc2-91c6-5bde832ace80";
    var clientSecret = "*4]i8-29at*2KEBsNE3yekwUSh]]WXRI";
    // Use the context to acquire an authentication token.
    return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function(err, tokenResponse) {
        if (err) throw err;
        // Calculate the value to be set in the request's Authorization header and resume the call.
        var authorizationValue = tokenResponse;

        return callback(null, authorizationValue);
    });

};

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    if (name) {
      console.log(authenticator);

//var vaultUri = "https://rabia-keyvault-demo.vault.azure.net/secrets/mysupersecretkey/d635a71eb66f4794a3bd91a33db73fec";

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




// var credentials = new KeyVault.KeyVaultCredentials(authenticator);
// var client = new KeyVault.KeyVaultClient(credentials);


// let secretName = 'mysecret',
//     value = 'myValue',
//     optionsopt = {
//         contentType: 'sometype',
//         // tags: 'sometag',
//         // secretAttributes: 'someAttributes',
//         // contentType: 'sometype',
//         // customHeaders: 'customHeaders'
//     };
// client.setSecret(vaultUri, secretName, value, optionsopt).then((results) => {
//     console.log(results);
// })


export default httpTrigger;
