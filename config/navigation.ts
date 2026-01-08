const pages: Map<string, string> = new Map([
    [ "/", "Accueil" ],
    [ "/newsletter", "Newsletter" ],
    [ "/consultation", "Consultation" ],
    [ "/le-systeme-d-elite", "Le Système d'Élite" ],
    [ "/a-propos", "À Propos" ],
    [ "/contact", "Contact" ],
    [ "/conditions-generales", "Conditions Générales" ],
]);


export default pages;
export type PageEntries = Array<[string, string]>;