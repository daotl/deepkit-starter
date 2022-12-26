import * as trpc from "@trpc/server";

import { Context } from '~/trpc/context';

export const t = trpc.initTRPC.context<Context>().create();

export const publicProcedure = t.procedure;

