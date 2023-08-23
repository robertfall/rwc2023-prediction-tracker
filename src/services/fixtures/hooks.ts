import { useContext } from "react";
import { AppContext } from "../app-context";
import { useStore } from "zustand";
import { GroupFixture } from "../../data/fixtures";

export function useFixturessService() {
  return useContext(AppContext).fixturesService;
}

export function useGroupStageFixtures() {
  const service = useFixturessService();

  return useStore(
    service,
    (state) => state.fixtures.filter((m) => "group" in m) as GroupFixture[]
  );
}

export function useAllFixtures() {
  const service = useFixturessService();

  return useStore(service, (state) => [state.fixtures]);
}
