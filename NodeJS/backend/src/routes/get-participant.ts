import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { ClientError } from "../error/client-error";

export async function getParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/participants/:participantId', {
        schema: {
            params: z.object({
                tripId: z.string().uuid(),
                participantId: z.string().uuid()
            })
        },
    }, async (request) => {
        const { tripId, participantId } = request.params
        
        const participant = await prisma.participant.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                is_confirmed: true
            },
            where: { id: participantId },
        })

        if (!participant) {
            throw new ClientError('Participant not found.')
        }

        return { participant }
    })
}