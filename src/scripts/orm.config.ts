import { writeFile } from 'fs/promises';

import { DataSource, DataSourceOptions } from 'typeorm';

import { dataBaseConfigurations } from 'src/config/db.config';

const dataSource = new DataSource(dataBaseConfigurations as DataSourceOptions);

writeFile('ormconfig.json', JSON.stringify(dataSource.options, null, 2));
export { dataSource, dataBaseConfigurations };
