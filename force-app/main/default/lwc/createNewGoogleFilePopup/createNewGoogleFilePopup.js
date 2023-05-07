import { LightningElement, track } from "lwc";
import createGoogleFile from "@salesforce/apex/GoogleRestAPI.createGoogleFile";
export default class CreateNewGoogleFilePopup extends LightningElement {
    isModalOpen = false;
    selectedOption = "";
    fileName = "";
    @track options = [
        { label: "Google document", value: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
        { label: "Google sheet", value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
        { label: "Google notebook", value: "application/vnd.google-apps.spreadsheet" },
        { label: "Google PDF", value: "application/pdf" },
        { label: "Google presentation", value: "application/vnd.google-apps.presentation" }
    ];

    handleSelection(event) {
        this.selectedOption = event.target.value;
        // Handle selected option value
    }
    handleSetFileName(event) {
        this.fileName = event.target.value;
    }
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        if (this.selectedOption || this.fileName) {
            createGoogleFile({ name: this.fileName, mimeType: this.selectedOption });
            this.isModalOpen = false;
            // eslint-disable-next-line no-undef
            const refreshEvent = new CustomEvent("refresh");
            this.dispatchEvent(refreshEvent);
        }
    }
}
