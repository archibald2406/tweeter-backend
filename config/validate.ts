import { Expose, plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

export enum EnvironmentVariableKeys {
    port = 'PORT',
    dbHost = 'DATABASE_HOST',
    dbName = 'DATABASE_NAME',
    dbUser = 'DATABASE_USER',
    dbPassword = 'DATABASE_PASSWORD',
    dbPort = 'DATABASE_PORT',
}

class EnvironmentVariables {
    @Expose() @IsString() [EnvironmentVariableKeys.port]: string;
    @Expose() @IsString() [EnvironmentVariableKeys.dbHost]: string;
    @Expose() @IsString() [EnvironmentVariableKeys.dbName]: string;
    @Expose() @IsString() [EnvironmentVariableKeys.dbUser]: string;
    @Expose() @IsString() [EnvironmentVariableKeys.dbPassword]: string;
    @Expose() @IsString() [EnvironmentVariableKeys.dbPort]: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true
    });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length) {
        let messages = errors.map(err => {
            return `${err.property} - ${Object.values(err.constraints).join(', ')}`
        })
        throw new Error(messages.join(';\n'));
    }
    return validatedConfig;
}
