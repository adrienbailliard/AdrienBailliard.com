const site = {
    url: "https://adrienbailliard.com",
    logo: {
        url: "/assets/illustrations/social-media-preview.png",
        width: 1200,
        height: 630
    },
    name: "Adrien Bailliard",
    description: "Systèmes pour une Performance d'Élite",
    faviconsFolder: "/assets/favicons/",
    emailAssetsFolder: "/assets/email/",
    newsletterSlogan: "Une Clé pour ",
    adminCookie: {
        path: "/",
        name: "magic_link",
        tokenExpiration: 15 * 60,
        maxAge: 2 * 24 * 60 * 60
    },
    errorMessage: "Une erreur est survenue."
};

export default site;