import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from '@/trpc';
import { NextRequest } from "next/server";

const handler = (req: Request) => fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({})
});

export { handler}