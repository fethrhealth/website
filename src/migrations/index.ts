import * as migration_20260307_193829 from './20260307_193829';
import * as migration_20260307_210718 from './20260307_210718';
import * as migration_20260319_071559 from './20260319_071559';
import * as migration_20260324_202458 from './20260324_202458';
import * as migration_20260331_204705 from './20260331_204705';

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
    name: '20260324_202458',
  },
  {
    up: migration_20260331_204705.up,
    down: migration_20260331_204705.down,
    name: '20260331_204705'
  },
];
