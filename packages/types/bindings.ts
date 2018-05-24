import { ObjectsMap } from "./cache";
import { GrafooObject } from "./tag";
import { GraphQlError, Variables } from "./transport";

export interface Bindings {
  getState(): GrafooRenderProps;
  update(nextObjects: ObjectsMap): void;
  executeQuery(): void;
}

export interface GrafooRenderProps {
  loading: boolean;
  loaded: boolean;
  errors?: GraphQlError[];
}

export type Mutate<T> = (variables?: Variables) => Promise<T>;

export type GrafooRenderFn = <T>(renderProps: GrafooRenderProps) => T;

export type UpdateFn<T, U> = (
  props: { mutate: Mutate<U> } & GrafooRenderProps & T,
  variables?: Variables
) => Promise<T>;

export type OptimisticUpdateFn<T> = (props: GrafooRenderProps & T, variables?: Variables) => T;

export interface GrafooMutation<T = any, U = any> {
  query: GrafooObject;
  optimisticUpdate?: OptimisticUpdateFn<T>;
  update: UpdateFn<T, U>;
}

export interface GrafooConsumerProps {
  query?: GrafooObject;
  mutations?: { [name: string]: GrafooMutation };
  variables?: Variables;
  skip?: boolean;
  render: GrafooRenderFn;
  [key: string]: any;
}