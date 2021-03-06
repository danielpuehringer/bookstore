export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}
export const BookFormErrorMessages = [
    new ErrorMessage('title', 'required', 'Ein Buchtitel muss angegeben werden'),
    new ErrorMessage('isbn', 'required', 'Es muss eine ISBN angegeben werden'),
    new ErrorMessage('isbn', 'minlength', 'Die ISBN muss mindestens 10 Zeichen enthalten'),
    new ErrorMessage('isbn', 'maxlength', 'Eine ISBN darf höchstens 13 Zeichen haben'),
    new ErrorMessage('isbn', 'isbnFormat', 'Eine ISBN darf nur zwischen 10-13 Zeichen haben'),
    new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden'),
    new ErrorMessage('authors', 'required', 'Es muss ein Autor angegeben werden'),
    new ErrorMessage('rating', 'min', 'Bewertung kann nur positive Werte annehmen'),
    new ErrorMessage('rating', 'max', 'Maximal 10 Sterne erlaubt'),
    new ErrorMessage('images', 'atLeastOneImage', 'Zumindest ein Bild benötigt (inkl. URL und Titel)!'),
    new ErrorMessage('net_price', 'required', 'The book has to have a price(net)!'),
    new ErrorMessage('net_price', 'min', 'The minimum price is 0.00!'),
    new ErrorMessage('net_price', 'max', 'The maximum price is 9999.99!'),
];