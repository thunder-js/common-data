import React from 'react'
import { ComponentType } from 'react';
import { withProps, InferableComponentEnhancerWithProps } from 'recompose'
import { ApolloQueryResult, FetchMoreOptions, FetchMoreQueryOptions } from 'apollo-client';
import { OperationVariables } from 'react-apollo/types'
import { QueryProps } from 'react-apollo'

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
    refetch: (variables?: OperationVariables) => Promise<ApolloQueryResult<any>>;
    fetchMore: (fetchMoreOptions: FetchMoreQueryOptions & FetchMoreOptions) => Promise<ApolloQueryResult<any>>;
  }
}

const initialLoading = (networkStatus: number): boolean => networkStatus === 1;
const activelyRefetching = (networkStatus: number): boolean => networkStatus === 4;
const passivelyRefetching = (networkStatus: number): boolean => networkStatus === 2 || networkStatus === 6;
const fetchingMore = (networkStatus: number): boolean => networkStatus === 3;

export type RC<Props> = React.ComponentClass<Props> | React.StatelessComponent<Props>

export function withLoading <P>(isLoading: (props: P) => boolean, LoadingComponent: RC<any>) {
  return (WrappedComponent: RC<P>) => class extends React.Component<P, {}> {
    public render() {
      const loading: boolean = isLoading(this.props)
      if (loading) {
        return (
          <LoadingComponent />
        )
      }
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
}

export const withPlaceholder = <P extends {}>(isEmpty: (props: P) => boolean, PlaceholderComponent: ComponentType<P>) => (WrappedComponent: RC<P>) => class extends React.Component<P,{}> {
  public render() {
    const empty: boolean = isEmpty(this.props)
    if (empty) {
      return (
        <PlaceholderComponent {...this.props} />
      )
    }
    return (
      <WrappedComponent {...this.props} />
    )
  }
}
export const withError = <P extends {}>(isError: (props: P) => boolean, ErrorComponent: ComponentType<P>) => (WrappedComponent: RC<P>) => class extends React.Component<P,{}> {
  public render() {
    const error: boolean = isError(this.props)
    if (error) {
      return (
        <ErrorComponent {...this.props} />
      )
    }
    return (
      <WrappedComponent {...this.props} />
    )
  }
}

export const withApolloFetchState = (): InferableComponentEnhancerWithProps<IFetchState, {data: QueryProps}> => withProps(props => ({
  fetchState: {
    initialLoading: initialLoading(props.data.networkStatus),
    activelyRefetching: activelyRefetching(props.data.networkStatus),
    passivelyRefetching: passivelyRefetching(props.data.networkStatus),
    fetchingMore: fetchingMore(props.data.networkStatus),
  },
}))

export const withApolloFetchActions = (): InferableComponentEnhancerWithProps<IFetchActions, {data: QueryProps}> => withProps(props => ({
  fetchActions: {
    refetch: props.data.refetch,
    fetchMore: props.data.fetchMore,
  },
}))