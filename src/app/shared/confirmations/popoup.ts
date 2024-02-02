import { FuseConfirmationConfig } from '@fuse/services/confirmation'


export const confirmationOptions: FuseConfirmationConfig = {
    title: 'Contenuto salvato',
    message: 'Creazione nuovo contenuto avvenuta con successo!',
    icon: {
        name: 'heroicons_outline:badge-check',
        color: 'primary',
    },
    actions: {
        confirm: {
            label: 'Ok',
            color: 'primary',
        },
        cancel: {
            show: false,
        },
    },
    dismissible: true,
}

export const confirmationDeleteOptions: FuseConfirmationConfig = {
    title: 'Elimina contenuto',
    message: 'Siete sicuri di voler eliminare questo contenuto? Una volta eliminato non si potrà tornare indietro!',
    icon: {
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn',
    },
    actions: {
        confirm: {
            show: true,
            label: 'Elimina',
            color: 'warn',
        },
        cancel: {
            show: true,
            label: 'Non Eliminare',
        },
    },
    dismissible: true,
}

export const confirmationDeplyOptions: FuseConfirmationConfig = {
    title: 'Nuovo aggiornamento',
    message: 'E\' disponibile un nuovo aggiornamento dell\'applicazione. Ricaricare la pagina. Ricordati di salvare le modifiche.',
    icon: {
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'primary',
    },
    actions: {
        confirm: {
            show: true,
            label: 'Aggiorna pagina',
            color: 'primary',
        },
        cancel: {
            show: true,
            label: 'Aggiorno dopo...',
        },
    },
    dismissible: true,
}

export const confirmationDeleteScenario: FuseConfirmationConfig = {
    title: 'Eliminare scenario?',
    message: 'Siete sicuri di voler continuare?',
    icon: {
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn',
    },
    actions: {
        confirm: {
            show: true,
            label: 'Elimina',
            color: 'warn',
        },
        cancel: {
            show: true,
            label: 'Non Eliminare',
        },
    },
    dismissible: true,
}

export const errorOptions: FuseConfirmationConfig = {
    title: 'Elimina contenuto',
    message: 'Siete sicuri di voler eliminare questo contenuto? Una volta eliminato non si potrà tornare indietro!',
    icon: {
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'error',
    },
    actions: {
        confirm: {
            show: true,
            label: 'Chiudi',
            color: 'warn',
        },
        cancel: {
            show: false,
        },
    },
    dismissible: true,
}

export const error500Options: FuseConfirmationConfig = {
    title: 'Errore',
    message: 'Si è verificato un errore, vi preghiamao di riprovare più tardi!',
    icon: {
        show: true,
        name: 'heroicons_outline:exclamation-circle',
        color: 'error',
    },
    actions: {
        confirm: {
            show: true,
            label: 'Ok',
            color: 'warn',
        },
        cancel: {
            show: false,
        },
    },
    dismissible: true,
}

export const error403Options: FuseConfirmationConfig = {
    title: 'Errore',
    message: 'Contenuto duplicato!',
    icon: {
        show: true,
        name: 'heroicons_outline:exclamation-circle',
        color: 'warning',
    },
    actions: {
        confirm: {
            show: true,
            label: 'Ok',
            color: 'warn',
        },
        cancel: {
            show: false,
        },
    },
    dismissible: true,
}

export const error404Options: FuseConfirmationConfig = {
    title: 'Errore',
    message: 'Contenuto non trovato!',
    icon: {
        show: true,
        name: 'heroicons_outline:exclamation-circle',
        color: 'warning',
    },
    actions: {
        confirm: {
            show: true,
            label: 'Ok',
            color: 'warn',
        },
        cancel: {
            show: false,
        },
    },
    dismissible: true,
}



export const error422Options: FuseConfirmationConfig = {
    title: 'Errore',
    message: 'Contenuto non trovato!',
    icon: {
        show: true,
        name: 'heroicons_outline:exclamation-circle',
        color: 'warning',
    },
    actions: {
        confirm: {
            show: true,
            label: 'Ok',
            color: 'warn',
        },
        cancel: {
            show: false,
        },
    },
    dismissible: true,
}

export const error401Options: FuseConfirmationConfig = {
    title: 'Errore',
    message: 'Contenuto non trovato!',
    icon: {
        show: true,
        name: 'heroicons_outline:exclamation-circle',
        color: 'primary',
    },
    actions: {
        confirm: {
            show: true,
            label: 'Vai alla Login',
            color: 'primary',
        },
        cancel: {
            show: false,
        },
    },
    dismissible: true,
}