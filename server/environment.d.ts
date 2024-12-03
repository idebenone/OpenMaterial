declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_PORT: number;
            GEMINI_API_KEY: string;

            DB_NAME: string;
            DB_USER: string;
            DB_PASS: string;
            DB_HOST: string;
            DB_PORT: number;
        }
    }
}

export { }