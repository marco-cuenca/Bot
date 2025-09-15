import { addKeyword, EVENTS } from '@builderbot/bot'
import { MysqlAdapter as Database } from '@builderbot/database-mysql'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

export const unregisteredPatientFlow = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(
        [
            'Indícanos el tipo de documento de identidad \n.', 
            '1: DNI', 
            '2: Carnet de extranjería', 
            '3: Pasaporte'
        ].join('\n'),
        { capture: true },
    )
    .addAction(async (ctx, { flowDynamic, fallBack, state }) => {
        const documentType = ctx.body.toLocaleLowerCase();

        if (!['1', '2', '3'].includes(documentType)) return fallBack('Ingresa un valor válido')

        await state.update({ documentType });

        await flowDynamic(`Gracias por la información ${state.get('name')}`);
    });


