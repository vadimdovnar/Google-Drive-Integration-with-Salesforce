public with sharing class DriveFilesResponse {
    public List<DriveFile> files;

    public class DriveFile {
        public String mimeType;
        public String webViewLink;
        public String webContentLink;
        public String id;
        public String name;
        public Datetime createdTime;
        public Datetime modifiedTime;
    }
}
