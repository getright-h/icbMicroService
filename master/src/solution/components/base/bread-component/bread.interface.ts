export interface IBread {
  name: string;
  path?: string;
}

export class IStore {
  breads: IBread[];
}
