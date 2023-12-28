import { publicProcedure, router } from './trpc'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const appRouter = router ({
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user?.id || !user?.email)
            throw new TRPCError({ code: 'UNAUTHORIZED' })

        // verify if user exists on database
        const dbUser = await db.user.findFirst({
            where: { id: user.id }
        })

        // create new user if not a user
        if (!dbUser) {
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                }
            })
        }

        return { success: true };
    })
});

export type AppRouter = typeof appRouter;