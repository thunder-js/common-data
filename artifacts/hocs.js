import { branch, mapProps, renderComponent, compose } from 'recompose';
import { graphql } from 'react-apollo';
const initialLoading = (networkStatus) => networkStatus === 1;
const activelyRefetching = (networkStatus) => networkStatus === 4;
const passivelyRefetching = (networkStatus) => networkStatus === 2 || networkStatus === 6;
const fetchingMore = (networkStatus) => networkStatus === 3;
export const withLoading = (isLoading, LoadingComponent) => branch(isLoading, renderComponent(LoadingComponent));
export const withPlaceholder = (isEmpty, PlaceholderComponent) => branch(isEmpty, renderComponent(PlaceholderComponent));
export const withError = (isError, ErrorComponent) => branch(isError, renderComponent(ErrorComponent));
export const withApolloFetchState = () => mapProps(props => (Object.assign({}, props, { fetchState: {
        initialLoading: initialLoading(props.data.networkStatus),
        activelyRefetching: activelyRefetching(props.data.networkStatus),
        passivelyRefetching: passivelyRefetching(props.data.networkStatus),
        fetchingMore: fetchingMore(props.data.networkStatus),
    } })));
export const withApolloFetchActions = () => mapProps(props => (Object.assign({}, props, { fetchActions: {
        refetch: props.data.refetch,
        fetchMore: props.data.fetchMore,
    } })));
const defaultBranchFunctions = {
    isEmpty: ({ data }) => !data,
};
export const enhancedGraphql = (query, config, componentMap, branchFunctions) => compose(graphql(query, config), withApolloFetchState(), withApolloFetchActions(), withError(({ error }) => !!error, componentMap.ErrorComponent), withLoading(props => props.fetchState.initialLoading, componentMap.LoadingComponent), withPlaceholder(branchFunctions.isEmpty || defaultBranchFunctions.isEmpty, componentMap.PlaceholderComponent));
//# sourceMappingURL=hocs.js.map