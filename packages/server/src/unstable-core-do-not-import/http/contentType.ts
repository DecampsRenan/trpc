import type { TRPCError } from '../error/TRPCError';
import type { Maybe } from '../types';

export type BodyResult =
  | {
      ok: true;
      data: unknown;
      /**
       * If the HTTP handler has already parsed the body
       */
      preprocessed: boolean;
    }
  | { ok: false; error: TRPCError };

export type BaseContentTypeHandler<TOptions> = {
  name: string;
  isMatch(opts: TOptions): { match: boolean; received: Maybe<string> };
  getInputs: (
    opts: TOptions,
    info: {
      isBatchCall: boolean;
      batch: number;
    },
  ) => Promise<unknown>;
};
