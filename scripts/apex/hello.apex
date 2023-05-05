// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

Http http = new Http();
HttpRequest request = new HttpRequest();
request.setMethod('GET');
request.setHeader('Accept', 'application/json');
request.setHeader('Content-type', 'application/json');
request.setEndpoint('callout:Google_Docs_API/files?fields=files(id,name,modifiedTime,mimeType,webViewLink,webContentLink,emailAddress,createdTime)');

HttpResponse response = http.send(request);
System.debug(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::   ' + response.getBody());