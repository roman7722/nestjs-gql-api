import chalk from 'chalk';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringTrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(chalk.blue('\n[GLOBAL PIPES] [StringTrimPipe] [Before] \n'));
    console.log(chalk.cyan.italic('value:'), value, '\n');

    try {
      if (value) {
        const transformedValue = { ...value };

        for (const key in transformedValue) {
          if (typeof transformedValue[key] === 'string') {
            transformedValue[key] = transformedValue[key].trim();
          }
        }

        console.log(chalk.blue('[GLOBAL PIPES] [StringTrimPipe] [After] \n'));
        console.log(
          chalk.cyan.italic('transformedValue:'),
          transformedValue,
          '\n',
        );

        return transformedValue;
      }

      return value;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
