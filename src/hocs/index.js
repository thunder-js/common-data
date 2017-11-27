//  @flow
import type { Node } from 'react'
import { branch, mapProps, renderComponent, compose, type HOC } from 'recompose'
import { graphql } from 'react-apollo'
import type { OperationOption } from 'react-apollo'

export type FetchState = {
  fetchState: {
    initialLoading: boolean,
    activelyRefetching: boolean,
    passivelyRefetching: boolean,
    fetchingMore: boolean,
  }
}
export type FetchActions = {
  fetchActions: {
    refetch: () => void,
    fetchMore: () => void
  }
}

const initialLoading = (networkStatus: number): boolean => networkStatus === 1;
const activelyRefetching = (networkStatus: number): boolean => networkStatus === 4;
const passivelyRefetching = (networkStatus: number): boolean => networkStatus === 2 || networkStatus === 6;
const fetchingMore = (networkStatus: number): boolean => networkStatus === 3;

export const withLoading = <Props: {}>(isLoading: (props: Props) => boolean, LoadingComponent: Node): HOC<Props, Props> => branch(
  isLoading,
  renderComponent(LoadingComponent),
)

export const withPlaceholder = <Props: {}>(isEmpty: (props: Props) => boolean, PlaceholderComponent: Node): HOC<Props, Props> => branch(
  isEmpty,
  renderComponent(PlaceholderComponent),
)

export const withError = <Props: {}>(isError: (props: Props) => boolean, ErrorComponent: Node): HOC<Props, Props> => branch(
  isError,
  renderComponent(ErrorComponent),
)

export const withApolloFetchState = <Props: {}>():HOC<Props, FetchState & Props> => mapProps(props => ({
  ...props,
  fetchState: {
    initialLoading: initialLoading(props.data.networkStatus),
    activelyRefetching: activelyRefetching(props.data.networkStatus),
    passivelyRefetching: passivelyRefetching(props.data.networkStatus),
    fetchingMore: fetchingMore(props.data.networkStatus),
  },
}))

export const withApolloFetchActions = <Props: {}>(): HOC<Props, FetchActions & Props> => mapProps(props => ({
  ...props,
  fetchActions: {
    refetch: props.data.refetch,
    fetchMore: props.data.fetchMore,
  },
}))

type ComponentMap = {
  LoadingComponent: Node,
  PlaceholderComponent: Node,
  ErrorComponent: Node
}
export const enhancedGraphql = <Props: {}>(query: any, config: OperationOption<*, *>, componentMap: ComponentMap): HOC<Props, Props & FetchState & FetchActions> => compose(
  graphql(query, config),
  withApolloFetchState(),
  withApolloFetchActions(),
  withError(({ error }) => error, componentMap.ErrorComponent),
  withLoading(({ data: { loading } }) => loading, componentMap.LoadingComponent),
  withPlaceholder(({ data }) => !data, componentMap.PlaceholderComponent),
)
