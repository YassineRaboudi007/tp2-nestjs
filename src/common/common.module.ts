import { Global, Module } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const PROVIDER_TOKENS = {
  uuid: {
    provide: 'uuid',
    useValue: uuidv4,
  },
};

@Global()
@Module({
  providers: [PROVIDER_TOKENS.uuid],
  exports: ['uuid'],
})
export class CommonModule {}
