import {query} from 'stardog';
import {IS_DEVELOPMENT} from '../config/constants';
import {connection, database, mimeType} from '../config/stardogConnection';

export interface QuerySource<Parameters_ extends Record<string, unknown>> {
  source(parameters: Parameters_): string;
  reasoning: boolean;
}

export async function stardogQuery<Parameters_ extends Record<string, unknown>>({source, reasoning}: QuerySource<Parameters_>, parameters: Parameters_): Promise<any> {
  if (IS_DEVELOPMENT) {
    console.log('Running query: ');
    console.log(source(parameters));
  }

  return query
    .execute(connection, database, source(parameters), mimeType, {
      reasoning,
    })
    .then(result => {
      if (!result.ok) {
        throw new Error(`HTTP request result = ${result.status}`);
      }

      return result.body.results.bindings;
    });
}
