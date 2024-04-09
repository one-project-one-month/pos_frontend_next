interface Configs {
    googleClientId: string;
    googleClientSecret: string;
    nextAuthSecret: string;
}

export const configs: Configs = {
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    nextAuthSecret: process.env.NEXTAUTH_SECRET || "",
};
