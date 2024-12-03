export interface Node {
    id: string
    label: string
    content: string
}

export interface Edge {
    source: string
    target: string
}

export function appendFields(nodes: Node[], edges: Edge[]) {
    const getNodeLevel: any = (nodeId: string, edges: Edge[], level = 0) => {
        const parentEdge = edges.find((edge: Edge) => edge.target === nodeId);
        return parentEdge ? getNodeLevel(parentEdge.source, edges, level + 2) : level;
    };

    const positions: any = {};
    nodes.forEach((node: Node) => {
        const level = getNodeLevel(node.id, edges);
        if (!positions[level]) positions[level] = [];
        positions[level].push(node.id);
    });

    const updatedNodes = nodes.map((node, index) => {
        const level = getNodeLevel(node.id, edges);
        const positionIndex = positions[level].indexOf(node.id);
        return {
            ...node,
            data: {
                id: node.id,
                label: node.label,
                content: node.content
            },
            dragging: true,
            height: 150,
            position: { x: level * 300, y: positionIndex * 200 },
            positionAbsolute: { x: level * 300, y: positionIndex * 200 },
            selected: false,
            type: "custom",
            width: 340
        };
    });

    const updatedEdges = edges.map(edge => {
        return {
            ...edge,
            animated: true,
            sourceHandle: null,
            targetHandle: null
        };
    });

    return { updatedNodes, updatedEdges }
}