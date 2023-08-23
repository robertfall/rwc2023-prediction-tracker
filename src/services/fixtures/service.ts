import { StoreApi, UseBoundStore, create } from "zustand";
import { produce } from "immer";
import { Fixture } from "../../data/fixtures";

export type FixturesStore = {
  fixtures: Fixture[];
  setFixtures: (fixtures: Fixture[]) => void;
};

export type FixturesService = UseBoundStore<StoreApi<FixturesStore>>;

export function createFixturesService(fixtures: readonly Fixture[]): FixturesService {
  return create<FixturesStore>((set) => ({
    fixtures: [...fixtures],
    setFixtures: (fixtures: Fixture[]) => {
      set((state) =>
        produce(state, (draft) => {
          draft.fixtures = fixtures;
        })
      );
    },
  }));
}
