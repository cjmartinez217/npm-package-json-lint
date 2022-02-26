import parser from 'jsonc-parser';
import {PackageJson} from 'type-fest';

/**
 * Determines whether or not the node exists in the package.json file
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @return True if the node exists. False if it is not.
 */
 export const exists = (packageJsonData: PackageJson | any, nodeName: string): boolean => packageJsonData.hasOwnProperty(nodeName);

/**
 * Search for duplicate properties in package.json file
 *
 * @param packageJsonSource JSON source string
 * @return List of duplicate property names.
 */
export const findDuplicatePropNames = (packageJsonSource: PackageJson): string[] => {
  const tree = parser.parseTree(packageJsonSource);

  if (!tree) {
    return [];
  }

  const traverse = (node, dups = []) => {
    const foundProps = new Map();

    // eslint-disable-next-line no-restricted-syntax
    for (const child of node.children) {
      const [propNameNode, propValNode] = child.children;
      const propName = propNameNode.value;

      if (foundProps.has(propName)) {
        dups.push(propName);
      } else {
        foundProps.set(propName, true);
      }

      if (propValNode.type === 'object') {
        traverse(propValNode, dups);
      }
    }

    return dups;
  };

  return traverse(tree);
};
