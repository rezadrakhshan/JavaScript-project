export function alert(title,text,icon,button,titleclass){
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: button,
        customClass: {
            popup: 'my-popup-class',
            title: titleclass,
            confirmButton: 'my-confirm-button-class',
            content: 'my-content-class'
        },
    });
}

export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}