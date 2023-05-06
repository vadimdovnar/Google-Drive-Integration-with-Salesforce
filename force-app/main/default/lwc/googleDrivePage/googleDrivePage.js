import { LightningElement, track } from "lwc";
import getAllFiles from "@salesforce/apex/GoogleRestAPI.getAllFiles";
export default class GoogleDrivePage extends LightningElement {
    @track files;

    // @wire(getAllFiles)
    // loadGreeting({ data, error }) {
    //     if (data) {
    //         this.files = JSON.parse(data);
    //     } else if (error) {
    //         console.error(error);
    //     }
    // }

    connectedCallback() {
        getAllFiles()
            .then((result) => {
                this.files = JSON.parse(result);
                this.convertDateTime(this.files);
            })
            .catch((error) => {
                console.error('ERROR::::::::::::::::::::::::: ' + error);
            });
    }
    convertDateTime(response) {
        for(let i = 0; i < response.length; i++) {
            let createdFileDate = new Date(response[i].createdTime);
            response[i].createdTime = createdFileDate.toLocaleDateString('en-US');
            let modifiedFileDate = new Date(response[i].modifiedTime);
            response[i].modifiedTime = modifiedFileDate.toLocaleDateString('en-US');
        }
    }
}
