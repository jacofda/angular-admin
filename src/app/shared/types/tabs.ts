import { InputsType } from "ng-dynamic-component"

export interface Tab {
    title: string               // Titolo della tab
    icon: string                // Icona della tab
    localStorageKey: string     // Chiave per il localstorage
    childComponent: any         // Componente da caricare nella tab
    bind?: InputsType           // Oggetto da passare al componente
    isShowable: Function        // Funzione per mostrare la tab
    childClose?: Function       // Callback alla chiusura del componente
}


// Dati minimi per InputsType per le tabelle
// remoteUrl?: string,        Url per il caricamento dei dati
// remoteTableData?: string,  Url per il caricamento dei dati della tabella
// frontRoute?: string,       Route per il front e per il redirect dopo aggiornamenti
