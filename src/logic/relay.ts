import R from 'ramda'

export interface Edge<NodeType> {
  node: NodeType
}

export const mapEdgesToEntities = <NodeType>(edges: Array<Edge<NodeType>> | undefined) => edges ? edges.map(edge => edge.node) : []
export const getEntitiesFromEdgesSafely = <NodeType>(path: string[], data): Array<NodeType> => mapEdgesToEntities<NodeType>(R.pathOr([], path, data))