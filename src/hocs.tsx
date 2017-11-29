import React from 'react'
// import { branch, renderComponent, compose, ComponentEnhancer, withProps, InferableComponentEnhancerWithProps } from 'recompose'
import { ComponentType } from 'react';
// import { graphql } from 'react-apollo'
// import { ChildProps, MutationOpts, QueryProps } from 'react-apollo/types';
// import { NetworkStatus } from 'apollo-client/core/networkStatus';

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

// Props que serão passadas para o WrappedComponent
// interface InjectedProps {
//   name: string
// }

// // Props que o Componente final recebe
// interface ExternalProps {
//   namePool: string[]
// }

// // Estado interno do Enhanced Component
// interface HOCState {
//   selectedIndex: number
// }

export type Comp<Props> = React.ComponentClass<Props> | React.StatelessComponent<Props>

export const withLoading = <P extends {}>(isLoading: (props: P) => boolean, LoadingComponent: ComponentType<P>) => (WrappedComponent: Comp<P>) => class extends React.Component<P,{}> {
  public render() {
    const loading: boolean = isLoading(this.props)
    if (loading) {
      return (
        <LoadingComponent {...this.props} />
      )
    }
    return (
      <WrappedComponent {...this.props} />
    )
  }
}

// export const withLoading = <ExternalProps, LoadingComponentProps>(isLoading: (props: ExternalProps) => boolean, LoadingComponent: ComponentType<LoadingComponentProps>): ComponentEnhancer<ExternalProps, ExternalProps> => branch<ExternalProps>(
//   isLoading,
//   renderComponent(LoadingComponent),
// )

// export const withPlaceholder = <TProps>(isEmpty: (props: TProps) => boolean, PlaceholderComponent: ComponentType<TProps>) => branch<TProps>(
//   isEmpty,
//   renderComponent(PlaceholderComponent),
// )

// export const withError = <TProps>(isError: (props: TProps) => boolean, ErrorComponent: ComponentType<TProps>) => branch<TProps>(
//   isError,
//   renderComponent(ErrorComponent),
// )

// export interface IApolloChildProps {
//   data: {
//     networkStatus: number
//     refetch: () => void
//     fetchMore: () => void
//   },
//   error?: any
// }

// export const withApolloFetchState = <P, R>() => withProps<IFetchState, ChildProps<P, R>>(props => ({
//   fetchState: {
//     initialLoading: initialLoading(props.data.networkStatus),
//     activelyRefetching: activelyRefetching(props.data.networkStatus),
//     passivelyRefetching: passivelyRefetching(props.data.networkStatus),
//     fetchingMore: fetchingMore(props.data.networkStatus),
//   },
// }))

// export const withApolloFetchActions = () => withProps<IFetchActions, IApolloChildProps>(props => ({
//   fetchActions: {
//     refetch: props.data.refetch,
//     fetchMore: props.data.fetchMore,
//   },
// }))

// const defaultBranchFunctions = {
//   isEmpty: ({ data }) => !data,
// }


// export const enhancedGraphql = (query: any, config, componentMap, branchFunctions) => compose<IFetchState & IFetchActions, {}>(
//   graphql(query, config),
//   withApolloFetchState(),
//   withApolloFetchActions(),
//   withError<IApolloChildProps>(props => !!props.error, componentMap.ErrorComponent),
//   // withLoading<IFetchState>(props => props.fetchState.initialLoading, componentMap.LoadingComponent),
//   withPlaceholder(branchFunctions.isEmpty || defaultBranchFunctions.isEmpty, componentMap.PlaceholderComponent),
// )
