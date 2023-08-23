import { useContext } from "react";
import { AppContext } from "../app-context";
import { useStore } from "zustand";

export function useFixturessService() {
  return useContext(AppContext).fixturesService;
}

export function useGroupStageFixtures() {
  const service = useFixturessService();

  return useStore(service, (state) =>
    state.fixtures.filter((m) => "group" in m)
  );
}

export function useAllFixtures() {
  const service = useFixturessService();

  return useStore(service, (state) => [state.fixtures]);
}
