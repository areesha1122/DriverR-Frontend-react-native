import io from 'socket.io-client';
import {ENV} from 'src/config/env';

export const sockett = io(ENV.base);
