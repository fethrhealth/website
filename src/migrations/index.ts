import * as migration_20260307_193829 from './20260307_193829';
import * as migration_20260307_210718 from './20260307_210718';
import * as migration_20260319_071559 from './20260319_071559';
import * as migration_20260324_202458 from './20260324_202458';

export const migrations = [
  {
    up: migration_20260307_193829.up,
    down: migration_20260307_193829.down,
    name: '20260307_193829',
  },
  {
    up: migration_20260307_210718.up,
    down: migration_20260307_210718.down,
    name: '20260307_210718',
  },
  {
    up: migration_20260319_071559.up,
    down: migration_20260319_071559.down,
    name: '20260319_071559',
  },
  {
    up: migration_20260324_202458.up,
    down: migration_20260324_202458.down,
    name: '20260324_202458'
  },
];
