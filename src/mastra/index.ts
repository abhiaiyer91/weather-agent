import { Mastra } from '@mastra/core/mastra';
import { Observability } from '@mastra/observability';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows';
import { weatherAgent } from './agents';
import { toolCallAppropriatenessScorer, completenessScorer, translationScorer } from './scorers';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  storage: new LibSQLStore({ id: 'memory', url: ':memory:' }),
  scorers: {
    toolCallAppropriatenessScorer,
    completenessScorer,
    translationScorer,
  },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  observability: new Observability({
    default: {
      enabled: true,
    },
  }),
  bundler: {
    externals: ['difflib'],
  }
});
