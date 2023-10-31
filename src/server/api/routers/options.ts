import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";


export const optionsRouter = createTRPCRouter({
    hello: publicProcedure
        .query(({ ctx }) => {
            return `hello ${ctx.session?.user.name}`
        }),
    getOptions: publicProcedure
        .query(async ({ ctx }) => {
            if (!ctx.session?.user) { return null }
            const account = await ctx.db.user.findFirst({
                where: { id: ctx.session.user.id }
            })
            return account
        }),
    setTheme: protectedProcedure
        .input(z.object({ theme: z.string() }))
        .mutation(async ({ input, ctx }) => {
            if (!ctx.session?.user) { return null }
            const options = await ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data: { theme: input.theme }
            })
            return options
        }),
    setTiming: protectedProcedure
        .input(z.object({ timing: z.array(z.number()) }))
        .mutation(async ({ input, ctx }) => {
            if (input.timing.length !== 3) {
                return await ctx.db.user.update({
                    where: { id: ctx.session.user.id },
                    data: { timing: [25, 5, 15] }
                })
            }
            return await ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data: { timing: input.timing }
            })
        }),
    setIsAutoStartOptions: protectedProcedure
        .input(z.object({
            isAutoStartPomodoros: z.boolean(),
            isAutoStartBreaks: z.boolean()
        }))
        .mutation(async ({ input, ctx }) => {
            return await ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    isAutoStartPomodoros: input.isAutoStartPomodoros,
                    isAutoStartBreaks: input.isAutoStartBreaks
                }
            })
        }),
})