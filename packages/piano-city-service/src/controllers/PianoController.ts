import { RouteHandlerMethod } from 'fastify';
import PianoService from '../services/PianoService';
import Piano from '../models/Piano';

type GetSinglePianoParams = {
  pianoId: string;
}

export default interface PianoController {
  getAllPianos: RouteHandlerMethod;
  getSinglePiano: RouteHandlerMethod;
}

export class PianoControllerImpl {
  private readonly pianoService: PianoService;

  constructor(pianoService: PianoService) {
    this.pianoService = pianoService;
  }

  getAllPianos: RouteHandlerMethod = async (_, reply) => {
    const pianos = await this.pianoService.getAllPianos();
    reply.raw.statusMessage = 'Get All Pianos';
    reply.send({
      data: pianos,
    });
  };

  getSinglePiano: RouteHandlerMethod = async (request, reply) => {
    const params = request.params as GetSinglePianoParams;
    const piano = await this.pianoService.getSinglePiano(params.pianoId);
    if (!piano) {
      reply.raw.statusMessage = 'Piano Not Found';
      reply.status(404);
      reply.send({
        message: 'No piano found with the specified ID.',
      });
      return;
    }
    reply.raw.statusMessage = 'Get Single Piano';
    reply.send({
      data: piano,
    });
  }

  savePiano: RouteHandlerMethod = async (request, reply) => {
    const pianoToSave = request.body as Partial<Piano>;
    if (!pianoToSave) {
      reply.raw.statusMessage = 'Invalid Request';
      reply.status(400);
      reply.send({
        message: 'Malformed body.',
      });
      return;
    }
    const params = request.params as GetSinglePianoParams;
    const existingPiano = await this.pianoService.getSinglePiano(params.pianoId);
    if (!existingPiano) {
      reply.raw.statusMessage = 'Piano Not Found';
      reply.status(404);
      reply.send({
        message: 'No piano found with the specified ID.',
      });
      return;
    }
    const savedPiano = await this.pianoService.savePiano(pianoToSave);
    reply.raw.statusMessage = 'Get Single Piano';
    reply.send({
      data: savedPiano,
    });
  }
}
