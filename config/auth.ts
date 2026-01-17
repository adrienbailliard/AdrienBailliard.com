const authConfig = {
    cookie: {
        path: "/",
        name: "magic_link",
        maxAge: 2 * 24 * 60 * 60
    },
    tokenExpiration: 15 * 60
};


export default authConfig;