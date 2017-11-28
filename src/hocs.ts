import { branch, mapProps, renderComponent, compose } from 'recompose'
import { graphql } from 'react-apollo'

export interface IFetchState {
  fetchState: {
    initialLoading: boolean,
    activelyRefetching: boolean,
    passivelyRefetching: boolean,
    fetchingMore: boolean,
  }
}
export interface IFetchActions {
  fetchActions: {
    refetch: () => void,
    fetchMore: () => void
  }
}

const initialLoading = (networkStatus: number): boolean => networkStatus === 1;
const activelyRefetching = (networkStatus: number): boolean => networkStatus === 4;
const passivelyRefetching = (networkStatus: number): boolean => networkStatus === 2 || networkStatus === 6;
const fetchingMore = (networkStatus: number): boolean => networkStatus === 3;

export const withLoading = (isLoading: (props: any) => boolean, LoadingComponent: any) => branch(
  isLoading,
  renderComponent(LoadingComponent),
)

export const withPlaceholder = (isEmpty: (props: any) => boolean, PlaceholderComponent: any) => branch(
  isEmpty,
  renderComponent(PlaceholderComponent),
)

export const withError = (isError: (props: any) => boolean, ErrorComponent: any) => branch(
  isError,
  renderComponent(ErrorComponent),
)

export const withApolloFetchState = () => mapProps(props => ({
  ...props,
  fetchState: {
    initialLoading: initialLoading(props.data.networkStatus),
    activelyRefetching: activelyRefetching(props.data.networkStatus),
    passivelyRefetching: passivelyRefetching(props.data.networkStatus),
    fetchingMore: fetchingMore(props.data.networkStatus),
  },
}))

export const withApolloFetchActions = () => mapProps(props => ({
  ...props,
  fetchActions: {
    refetch: props.data.refetch,
    fetchMore: props.data.fetchMore,
  },
}))

const defaultBranchFunctions = {
  isEmpty: ({ data }) => !data,
}

export const enhancedGraphql = (query: any, config, componentMap, branchFunctions) => compose(
  graphql(query, config),
  withApolloFetchState(),
  withApolloFetchActions(),
  withError(({ error }) => !!error, componentMap.ErrorComponent),
  withLoading(props => props.fetchState.initialLoading, componentMap.LoadingComponent),
  withPlaceholder(branchFunctions.isEmpty || defaultBranchFunctions.isEmpty, componentMap.PlaceholderComponent),
)
