import * as migration_20260307_193829 from './20260307_193829';
import * as migration_20260307_210718 from './20260307_210718';

export const migrations = [
  {
    up: migration_20260307_193829.up,
    down: migration_20260307_193829.down,
    name: '20260307_193829',
  },
  {
    up: migration_20260307_210718.up,
    down: migration_20260307_210718.down,
    name: '20260307_210718'
  },
];
