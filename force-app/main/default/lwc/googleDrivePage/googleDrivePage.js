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
            })
            .catch((error) => {
                console.error('ERROR::::::::::::::::::::::::: ' + error);
            });
    }
}
