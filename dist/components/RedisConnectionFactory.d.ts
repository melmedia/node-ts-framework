import * as IORedis from 'ioredis';
import { RedisConfig } from '@melmedia/config';
export declare class RedisConnectionFactory {
    protected config: RedisConfig;
    create(): Promise<IORedis.Redis>;
}
