import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { getServerSession } from "next-auth";


export const timingRouter = createTRPCRouter({
    hello: publicProcedure
        .query(async ({ ctx }) => {

            return `hello ${ctx.session?.user.name}`
        })
})