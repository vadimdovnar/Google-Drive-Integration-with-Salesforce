public with sharing class GoogleRestAPI {
    @AuraEnabled(cacheable=true)
    public static Map<String, List<String>> getQueryWithFileHierarchy() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setHeader('Accept', 'application/json');
        request.setHeader('Content-type', 'application/json');
        request.setEndpoint('callout:Google_Docs_API/files?q=\'root\'+in+parents&fields=files(id,name,mimeType,createdTime,modifiedTime,parents)');

        HttpResponse response = http.send(request);
        Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        List<Map<String, Object>> files = new List<Map<String, Object>>();

        for (Object obj : (List<Object>) result.get('files')) {
            files.add((Map<String, Object>) obj);
        }

        Map<String, List<String>> hierarchy = new Map<String, List<String>>();
        for (Map<String, Object> file : files) {
            String fileId = (String) file.get('id');
            String fileName = (String) file.get('name');
            String mimeType = (String) file.get('mimeType');
            List<Object> parentIdsObj = (List<Object>) file.get('parents');
            List<String> parentIds = new List<String>();
            for (Object parentIdObj : parentIdsObj) {
                parentIds.add(String.valueOf(parentIdObj));
            }
            for (String parentId : parentIds) {
                List<String> children = hierarchy.get(parentId);
                if (children == null) {
                    children = new List<String>();
                    hierarchy.put(parentId, children);
                }
                children.add(fileId);
            }
        }
        return hierarchy;
    }

    @AuraEnabled(cacheable=true)
    public static String getAllFiles() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setHeader('Accept', 'application/json');
        request.setHeader('Content-type', 'application/json');
        request.setEndpoint('callout:Google_Docs_API/files?fields=files(id,name,modifiedTime,mimeType,webViewLink,webContentLink,createdTime)');

        HttpResponse response = http.send(request);
        DriveFilesResponse res = (DriveFilesResponse) JSON.deserialize(response.getBody(), DriveFilesResponse.class);
        // System.debug(':::::::::::::::::::RES:::::::::::::::::::::' + res.files);
        // for(DriveFilesResponse.DriveFile i : res.files) {
        //     System.debug('******************************** ' + i.name);
        // }
        return JSON.serialize(res.files);
    }
    @AuraEnabled(cacheable=true)
    public static void createGoogleFile(String name, String mimeType) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setHeader('Content-type', 'application/json');
        request.setEndpoint('callout:Google_Docs_API/files');
        String requestBody = '{"name": "' + name + '", "mimeType": "' + mimeType + '"}';
        request.setBody(requestBody);

        HttpResponse response = http.send(request);
    }
    @AuraEnabled(cacheable=true)
    public static void deleteGoogleFile(String id) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('DELETE');
        request.setHeader('Content-type', 'application/json');
        request.setEndpoint('callout:Google_Docs_API/files/' + id);

        HttpResponse response = http.send(request);
    }
}
