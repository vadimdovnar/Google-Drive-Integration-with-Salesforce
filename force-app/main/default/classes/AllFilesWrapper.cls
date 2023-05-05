public with sharing class AllFilesWrapper {
    public List<Files> files;

    public class Files {
        public String mimeType;
        public String webViewLink;
        public String webContentLink;
        public String id;
        public String name;
        public String createdTime;
        public String modifiedTime;
    }

    public static AllFilesWrapper parse(String json) {
        return (AllFilesWrapper) System.JSON.deserialize(json, AllFilesWrapper.class);
    }
}
