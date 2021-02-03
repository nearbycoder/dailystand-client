export const addResource = (onClose, query, mutationName, resourceName) => (
  cache,
  { data }
) => {
  onClose();

  const resourceList = cache.readQuery({ query });

  cache.writeQuery({
    query,
    data: {
      [resourceName]: {
        ...resourceList[resourceName],
        nodes: [...resourceList[resourceName].nodes, data[mutationName]],
      },
    },
  });
};

export const updateResource = (onClose, query, mutationName, resourceName) => (
  cache,
  { data }
) => {
  onClose();

  const resourceList = cache.readQuery({ query });

  const newResourceList = resourceList[resourceName].nodes.map((resource) => {
    if (resource.id === data[mutationName].id) {
      return data[mutationName];
    }
    return resource;
  });
  cache.writeQuery({
    query,
    data: {
      [resourceName]: { ...resourceList[resourceName], nodes: newResourceList },
    },
  });
};

export const deleteResource = (onClose, query, mutationName, resourceName) => (
  cache,
  { data }
) => {
  onClose();

  const resourceList = cache.readQuery({ query });

  const newResourceList = resourceList[resourceName].nodes.filter(
    (resource) => resource.id !== data[mutationName].id
  );
  cache.writeQuery({
    query,
    data: {
      [resourceName]: { ...resourceList[resourceName], nodes: newResourceList },
    },
  });
};
