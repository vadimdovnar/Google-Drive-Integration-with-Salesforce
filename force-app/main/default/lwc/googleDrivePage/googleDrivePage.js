import { LightningElement, track } from "lwc";
import getAllFiles from "@salesforce/apex/GoogleRestAPI.getAllFiles";
import deleteGoogleFile from "@salesforce/apex/GoogleRestAPI.deleteGoogleFile";
export default class GoogleDrivePage extends LightningElement {
    @track files;
    
    loadingData = true;
    connectedCallback() {
        getAllFiles()
            .then((result) => {
                this.files = JSON.parse(result);
                this.convertDateTime(this.files);
                this.definesIconType(this.files);
                this.loadingData = false;
            })
            .catch((error) => {
                console.error("ERROR::::::::::::::::::::::::: " + error);
            });
    }
    convertDateTime(response) {
        for (let i = 0; i < response.length; i++) {
            let createdFileDate = new Date(response[i].createdTime);
            response[i].createdTime = createdFileDate.toLocaleDateString("en-US");
            let modifiedFileDate = new Date(response[i].modifiedTime);
            response[i].modifiedTime = modifiedFileDate.toLocaleDateString("en-US");
        }
    }
    splitString(str) {
        return str.match(/[a-zA-Z]+/g) || [];
    }
    handleRefresh() {
        location.reload();
    }
    definesIconType(response) {
        for (let i = 0; i < response.length; i++) {
            // eslint-disable-next-line default-case, no-undef
            const words = this.splitString(response[i].mimeType);
            // eslint-disable-next-line default-case
            switch (words[words.length - 1]) {
                case "sheet":
                    response[i].iconType = "doctype:excel";
                    break;
                case "document":
                    response[i].iconType = "doctype:gdoc";
                    break;
                case "pdf":
                    response[i].iconType = "doctype:pdf";
                    break;
                case "folder":
                    response[i].iconType = "doctype:folder";
                    break;
                case "presentation":
                    response[i].iconType = "doctype:gpres";
                    break;
                case "shortcut":
                    response[i].iconType = "doctype:unknown";
                    break;
                case "spreadsheet":
                    response[i].iconType = "doctype:gsheet";
                    break;
            }
        }
    }
    handleDelete(event) {
        const key = event.target.getAttribute('data-id');
        deleteGoogleFile({id : key});
        location.reload();
    }
}
