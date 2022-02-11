import {query} from 'stardog';
import {IS_DEVELOPMENT} from '../config/constants';
import {connection, database, mimeType} from '../config/stardogConnection';

export interface QuerySource<Params extends object> {
  source(parameters: Params): string;
  reasoning: boolean;
}

export async function stardogQuery<Params extends object>({source, reasoning}: QuerySource<Params>, parameters: Params): Promise<any> {
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
