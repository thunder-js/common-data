export interface IFetchState {
    fetchState: {
        initialLoading: boolean;
        activelyRefetching: boolean;
        passivelyRefetching: boolean;
        fetchingMore: boolean;
    };
}
export interface IFetchActions {
    fetchActions: {
        refetch: () => void;
        fetchMore: () => void;
    };
}
export declare const withLoading: (isLoading: (props: any) => boolean, LoadingComponent: any) => any;
export declare const withPlaceholder: (isEmpty: (props: any) => boolean, PlaceholderComponent: any) => any;
export declare const withError: (isError: (props: any) => boolean, ErrorComponent: any) => any;
export declare const withApolloFetchState: () => any;
export declare const withApolloFetchActions: () => any;
export declare const enhancedGraphql: (query: any, config: any, componentMap: any, branchFunctions: any) => any;
