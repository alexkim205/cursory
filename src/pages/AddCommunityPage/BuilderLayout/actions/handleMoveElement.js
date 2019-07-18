import {idToPath} from '../../helpers';
import {componentTypes} from '../../constants/component-types';
import {Log} from '../../../../_helpers';
import {BorderHighlight} from '../../constants/style-constants';
import {fromJS} from 'immutable';
import {ContainerItemClass, ContainerClass} from '../../components/addable-components';

export function handleMoveElement(
    builderState, oldComponent, newComponent, targetSide) {

  return new Promise((resolve, reject) => {
    let builderState = builderState;

    const oldId = oldComponent.get('id'),
        oldType = oldComponent.get('type'),
        newId = newComponent.get('id'),
        newType = newComponent.get('type');

    // Find index arrays to get to source
    // page -> 0 -> 0 -> 1 -> ...

    let sourcePath = idToPath(oldId);
    let targetPath = idToPath(newId);

    // Current, child, parent paths
    const sourceChildPath = sourcePath.concat(['childComponents']);
    const sourceParentPath = sourcePath.slice(0, sourcePath.length - 1);
    const targetChildPath = targetPath.concat(['childComponents']);
    const targetParentPath = targetPath.slice(0, targetPath.length - 1);

    let sourceEl = builderState.getIn(sourcePath);
    let sourceElChild = builderState.getIn(sourceChildPath);
    let sourceElParent = builderState.getIn(sourceParentPath);
    let targetEl = builderState.getIn(targetPath);
    let targetElChild = builderState.getIn(targetChildPath);
    let targetElParent = builderState.getIn(targetParentPath);

    /*
   For each pair, consider addition to top (t), right (r), bottom (b), left (l), inside (i) of target
   */
    const oldisGeneric = oldType === componentTypes.GENERIC;
    const oldisContainer = oldType === componentTypes.CONTAINER;
    const oldisContainerI = oldType === componentTypes.CONTAINER_ITEM;
    const newisGeneric = newType === componentTypes.GENERIC;
    const newisContainer = newType === componentTypes.CONTAINER;
    const newisContainerI = newType === componentTypes.CONTAINER_ITEM;

    // delete
    const deleteCurrent = () =>
        (builderState = builderState.deleteIn(sourcePath));
    const smartDeleteCurrent = () => {
      // If source container is before target, delete current as normal. However
      // if source is after target, there is a +1 offset where the old source
      // must be deleted. This phenomena only happens when moving around elements
      // that are in the same level.
      let pathToErase = sourcePath.slice();
      if (
          sourcePath.length === targetPath.length &&
          sourcePath[sourcePath.length - 1] > targetPath[sourcePath.length - 1]
      ) {
        pathToErase[sourcePath.length - 1] += 1;
      }

      builderState = builderState.deleteIn(pathToErase);
    };

    /* GENERIC to GENERIC */
    // t: insert before target
    // r: insert after target
    // b: insert after target
    // l: insert before target
    // i: undefined
    if (oldisGeneric && newisGeneric) {
      // parent: wrapper's childComponents (container-Item's children)
      // current: generic
      // child: childComponents (null)

      switch (targetSide) {
        case BorderHighlight.Top:
        case BorderHighlight.Left:
          Log.info('G->G.Top/Left');
          builderState = builderState.updateIn(
              targetParentPath,
              targetElParent =>
                  targetElParent.splice(
                      targetPath[targetPath.length - 1],
                      0,
                      sourceEl,
                  ),
          );
          smartDeleteCurrent();
          break;
        case BorderHighlight.Right:
        case BorderHighlight.Bottom:
          Log.info('G->G.Right/Bottom');
          builderState = builderState.updateIn(
              targetParentPath,
              targetElParent =>
                  targetElParent.splice(
                      targetPath[targetPath.length - 1] + 1,
                      0,
                      sourceEl,
                  ),
          );
          smartDeleteCurrent();
          break;
        case BorderHighlight.Center:
          Log.info('G->G.Center');
          break;
      }
    }

    /* GENERIC to CONTAINER-ITEM */
    // t: insert at beginning of target list
    // r: insert new container-item after target, add source to new item
    // b: insert at end of target list
    // l: insert new container-item before target, add source to new item
    // i: insert at end of target list
    if (oldisGeneric && newisContainerI) {
      // parent: wrapper (container's childComponents)
      // current: generic
      // child: childComponents (container-Item's childComponents)

      const newContainerItemMap = fromJS(
          JSON.parse(JSON.stringify(new ContainerItemClass())),
      ).updateIn(['childComponents'], list => list.push(sourceEl));

      deleteCurrent();

      switch (targetSide) {
        case BorderHighlight.Top:
          Log.info('G->CI.Top');
          builderState = builderState.updateIn(
              targetChildPath,
              targetElChild => targetElChild.unshift(sourceEl),
          );
          break;
        case BorderHighlight.Right:
          Log.info('G->CI.Right');
          builderState = builderState.updateIn(
              targetParentPath,
              targetElParent =>
                  targetElParent.splice(
                      targetPath[targetPath.length - 1] + 1,
                      0,
                      newContainerItemMap,
                  ),
          ); // insert new container-item after target
          break;
        case BorderHighlight.Bottom:
        case BorderHighlight.Center:
          Log.info('G->CI.Bottom/Center');
          builderState = builderState.updateIn(
              targetChildPath,
              targetElChild => targetElChild.push(sourceEl),
          );
          break;
        case BorderHighlight.Left:
          Log.info('G->CI.Left');
          builderState = builderState.updateIn(
              targetParentPath,
              targetElParent =>
                  targetElParent.splice(
                      targetPath[targetPath.length - 1],
                      0,
                      newContainerItemMap,
                  ),
          ); // insert new container-item after target
          break;
      }
    }

    /* GENERIC to CONTAINER */
    // t: insert new container before target, add source to new container
    // r: insert new container-item at end of target, add source to new item
    // b: insert new container after target, add source to new container
    // l: insert new container-item at beginning of target, add source to new item
    // i: insert new container-item at end of target, add source to new item
    if (oldisGeneric && newisContainer) {
      // parent: container wrapper (wrapper's childComponents)
      // current: container
      // child: container's childComponents (list of container-Items)

      // create new container-item
      const newContainerItemMap = fromJS(
          JSON.parse(JSON.stringify(new ContainerItemClass())),
      ).updateIn(['childComponents'], list => list.push(sourceEl));
      // create new container from container-item
      const newContainerMap = fromJS(
          JSON.parse(JSON.stringify(new ContainerClass())),
      ).updateIn(['childComponents'], list => list.push(newContainerItemMap));

      deleteCurrent();

      switch (targetSide) {
        case BorderHighlight.Top:
          Log.info('G->C.Top');
          builderState = builderState.updateIn(
              targetParentPath,
              targetElParent =>
                  targetElParent.splice(
                      targetPath[targetPath.length - 1],
                      0,
                      newContainerMap,
                  ),
          ); // insert new container before target
          break;
        case BorderHighlight.Right:
        case BorderHighlight.Center:
          Log.info('G->C.Right/Center');
          // if trying to drop into same container, behavior is undefined
          if (
              sourcePath[targetPath.length - 1] ===
              targetPath[targetPath.length - 1]
          )
            return;
          builderState = builderState.updateIn(
              targetChildPath,
              targetElChild => targetElChild.push(newContainerItemMap),
          ); // insert new container-item at end
          break;
        case BorderHighlight.Bottom:
          Log.info('G->C.Bottom');
          builderState = builderState.updateIn(
              targetParentPath,
              targetElParent =>
                  targetElParent.splice(
                      targetPath[targetPath.length - 1] + 1,
                      0,
                      newContainerMap,
                  ),
          ); // insert new container after target
          break;
        case BorderHighlight.Left:
          Log.info('G->C.Left');
          if (
              sourcePath[targetPath.length - 1] ===
              targetPath[targetPath.length - 1]
          )
            return;
          builderState = builderState.updateIn(
              targetChildPath,
              targetElChild => targetElChild.unshift(newContainerItemMap),
          ); // insert new container-item at beginning
          break;
      }
    }
    /* CONTAINER to CONTAINER-ITEM */ // Undefined Behavior // t: get all children, then insert children before target // r: get all children, then insert children after target // b: get all children, then insert children after target // l: get all children, then insert children before target // i: insert entire container to end of target's children

    /* CONTAINER to GENERIC */
    if (oldisContainer && newisContainerI) {
      // parent: wrapper (container's childComponents)
      // current: container-item
      // child: childComponents (container-Item's childComponents)

      // if container is empty, don't do anything
      if (sourceElChild.size === 0) return;

      switch (targetSide) {
        case BorderHighlight.Top:
        case BorderHighlight.Left:
          Log.info('C->CI.Top/Left');
          // basically merges lists before specific index
          builderState = builderState.setIn(
              targetParentPath,
              targetElParent.slice(0, targetPath[targetPath.length - 1]).
                  concat(sourceElChild).
                  concat(
                      targetElParent.slice(targetPath[targetPath.length - 1])),
          );
          deleteCurrent(); // important to delete after combining containers
          break;
        case BorderHighlight.Bottom:
        case BorderHighlight.Right:
        case BorderHighlight.Center:
          Log.info('C->CI.Bottom/Right/Center');
          // basically merges lists after specific index
          builderState = builderState.setIn(
              targetParentPath,
              targetElParent.slice(0, targetPath[targetPath.length - 1] + 1).
                  concat(sourceElChild).
                  concat(
                      targetElParent.slice(
                          targetPath[targetPath.length - 1] + 1),
                  ),
          );
          deleteCurrent(); // important to delete after combining containers
          break;
      }
    }

    /* CONTAINER to CONTAINER */
    // t: insert before target
    // r: insert after target
    // b: insert after target
    // l: insert before target
    // i: get all children, then insert children after target's children
    if (oldisContainer && newisContainer) {
      // parent: wrapper (page's childComponents)
      // current: container
      // child: childComponents (container's childComponents)

      // if container is empty, don't do anything
      if (sourceElChild.size === 0) return;
      // if source === target container, don't do anything
      if (JSON.stringify(sourcePath) === JSON.stringify(targetPath)) return;

      switch (targetSide) {
        case BorderHighlight.Top:
        case BorderHighlight.Left:
          Log.info('C->C.Top/Left');
          builderState = builderState.updateIn(
              targetParentPath,
              targetElParent =>
                  targetElParent.splice(
                      targetPath[targetPath.length - 1],
                      0,
                      sourceEl,
                  ),
          );
          smartDeleteCurrent(); // important to delete after combining containers
          break;
        case BorderHighlight.Bottom:
        case BorderHighlight.Right:
          Log.info('C->C.Bottom/Right');
          builderState = builderState.updateIn(
              targetParentPath,
              targetElParent =>
                  targetElParent.splice(
                      targetPath[targetPath.length - 1] + 1,
                      0,
                      sourceEl,
                  ),
          );
          smartDeleteCurrent(); // important to delete after combining containers
          break;
        case BorderHighlight.Center:
          Log.info('C->C.Center');
          builderState = builderState.setIn(
              targetChildPath,
              targetElChild.concat(sourceElChild),
          );
          deleteCurrent(); // important to delete after combining containers
          break;
      }
    }

    /* CONTAINER-ITEM to Anything */ // Cannot drag Container-item

    resolve(builderState);
  });
}
