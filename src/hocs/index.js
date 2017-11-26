import { branch, mapProps, renderComponent, compose } from 'recompose'
import { graphql } from 'react-apollo'

export const withLoading = (isLoading, LoadingComponent) => branch(
  isLoading,
  renderComponent(LoadingComponent),
)

export const withPlaceholder = (isEmpty, PlaceholderComponent) => branch(
  isEmpty,
  renderComponent(PlaceholderComponent),
)

export const withError = (isError, ErrorComponent) => branch(
  isError,
  renderComponent(ErrorComponent),
)


const initialLoading = networkStatus => networkStatus === 1;
const activelyRefetching = networkStatus => networkStatus === 4;
const passivelyRefetching = networkStatus => networkStatus === 2 || networkStatus === 6;
const fetchingMore = networkStatus => networkStatus === 3;

export const withApolloFetchState = mapProps(({ networkStatus }) => ({
  initialLoading: initialLoading(networkStatus),
  activelyRefetching: activelyRefetching(networkStatus),
  passivelyRefetching: passivelyRefetching(networkStatus),
  fetchingMore: fetchingMore(networkStatus),
}))

export const enhancedGraphql = (query, config, { LoadingComponent, PlaceholderComponent, ErrorComponent }) => compose(
  graphql(query, config),
  withApolloFetchState,
  withError(({ error }) => error, ErrorComponent),
  withLoading(({ data: { loading } }) => loading, LoadingComponent),
  withPlaceholder(({ data }) => !data, PlaceholderComponent),
)
