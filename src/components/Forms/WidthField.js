import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {fromJS} from 'immutable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  FormFieldWrapper,
  FormFieldCollapsibleInput,
  CollapsibleEntry,
} from './Form.style';
import {FormFieldWidthText} from './Form';
import {ContainerItemClass} from '../../pages/AddCommunityPage/addable-components';
import {columnWidthDescriptor} from '../../pages/AddCommunityPage/components';
import {theme} from '../../_styles';

const AddButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7em;
  // margin-bottom: 0.4em;
  
  button {
    border: none;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s;
    cursor: pointer;
    background-color: transparent;
    color: ${theme.colors.light_gray};
    
    &:hover {
      opacity: 1;
    }
  }
`;

const sizeDescriptions = ["1st","2nd","3rd","4th"]

// TODO: Generalize class into properties other than width
export class FormFieldCollapsibleWidth extends React.Component {
  static propTypes = {
    childComponents: PropTypes.array.isRequired,
    onChildrenChange: PropTypes.func.isRequired,
  };
  state = {
    active: false,
    width: 25,
  };

  componentWillReceiveProps(nextProps) {
    if (
        JSON.stringify(nextProps.childComponents) !==
        JSON.stringify(this.props.childComponents)
    ) {
      this.setState({stateChildComponents: nextProps.childComponents});
    }
  }

  boundWidthValue = width =>
      Math.max(
          Math.min(width, columnWidthDescriptor.bounds[1]),
          columnWidthDescriptor.bounds[0],
      );

  updateColumnStates = (event, entries) => {
    // update state and components
    this.setState({stateChildComponents: entries.toJS()});
    this.props.onChildrenChange(event, entries.toJS());
  };

  balanceWidths = (entries, indexOfImmutableColumn = null) => {
    const size = entries.size;
    if (size > 4) throw 'Too many columns!';

    const maxWidth = columnWidthDescriptor.bounds[1];
    const smallestWidth = Math.floor(maxWidth / 4);
    let widthSoFar = 0;
    let widths = [];

    // Is there a better way to do this in Immutable without two passes?
    // add up all widths first
    for (let j = 0; j < size; j++) {
      const entryWidthJ = entries.getIn([j, 'width']);
      widths.push(entryWidthJ);
      widthSoFar += entryWidthJ;
    }

    if (indexOfImmutableColumn) {
      // when adding column, editing column
      if (
          (size - 1) * smallestWidth + widths[indexOfImmutableColumn] >
          maxWidth
      ) {
        // if all other columns are 25, can the specified width still exist?
        // i.e. [25, 40, 80], index = 2; should be set to [25, 25, 50]
        widths = widths.map((v, i) =>
            i === indexOfImmutableColumn
                ? maxWidth - smallestWidth * (size - 1)
                : smallestWidth,
        );
      } else {
        if (widths[indexOfImmutableColumn] > smallestWidth) {
          // i.e. [25, 30, 40], index = 2; should be set to [25*60/55, 40*60/55, 40]
          const newOtherTotalWidths = maxWidth - widths[indexOfImmutableColumn];
          const oldOtherTotalWidths =
              widthSoFar - widths[indexOfImmutableColumn];
          widths = widths.map((v, i) =>
              i === indexOfImmutableColumn
                  ? v
                  : Math.floor((v * newOtherTotalWidths) / oldOtherTotalWidths),
          );
        } else {
          if (size === 1) {
            widths = [100];
          } else if (size === 2) {
            // i.e. [25, 15], index = 1; should be set to [75, 25]
            widths = widths.map((v, i) =>
                i === indexOfImmutableColumn
                    ? smallestWidth
                    : maxWidth - smallestWidth,
            );
          } else if (size === 3) {
            const newOtherTotalWidths = maxWidth - smallestWidth;
            const oldOtherTotalWidths =
                widthSoFar - widths[indexOfImmutableColumn];
            // i.e. [25, 30, 15], index = 2; should be set to []
            if (oldOtherTotalWidths > newOtherTotalWidths) {
              // i.e. [42, 43, 15], index = 2; should be set to []
              // i.e. [25, 60, 15], index = 2; should be set to []
              widths = widths.map((v, i) =>
                  i === indexOfImmutableColumn
                      ? smallestWidth
                      : Math.floor(this.boundWidthValue(
                      (v * newOtherTotalWidths) / oldOtherTotalWidths,
                      )),
              );
              if (widths.reduce((a, b) => a + b, 0) > maxWidth) {
                widths = widths.map((v, i) =>
                    v !== smallestWidth ? smallestWidth * 2 : v,
                );
              }
            } else {
              // i.e. [25, 30, 15], index = 2; should be set to [25*75/55, 30*75/55, 25]
              widths = widths.map((v, i) =>
                  i === indexOfImmutableColumn ?
                      v
                      :
                      Math.floor(
                          (v * newOtherTotalWidths) / oldOtherTotalWidths));
            }
          } else if (size === 4) {
            widths = [25, 25, 25, 25];
          }
        }
      }
    } else {
      // when removing column
      widths = widths.map(v => Math.floor((v * maxWidth) / widthSoFar));
    }

    // set new widths with balanced widths list
    for (let k = 0; k < size; k++) {
      entries = entries.setIn([k, 'width'], widths[k]);
    }

    return entries;
  };

  onEditChild = (e, newWidth, i) => {
    e.preventDefault();
    // i: entry number
    // e.target.name: property
    // e.target.value: property value
    const {childComponents} = this.props;
    let entries = fromJS(childComponents);

    // total widths must add up to 100 (or widthDescriptor bounds equivalent to max width)
    // assuming previous width is already at max
    // assuming e.target.name is width
    const widthToChange = this.boundWidthValue(parseInt(newWidth));
    entries = entries.setIn([i, 'width'], widthToChange);
    entries = this.balanceWidths(entries, i);

    // set new value to show in text input
    this.setState({width: entries.getIn([i, 'width'])});
    this.updateColumnStates(e, entries);
  };
  onRemoveChild = (e, i) => {
    const {childComponents} = this.props;
    let entries = fromJS(childComponents);
    entries = entries.delete(i);
    entries = this.balanceWidths(entries);

    this.setState({
      active: Math.max(0, i - 1),
      width: entries.getIn([Math.max(0, i - 1), 'width']),
    });
    this.updateColumnStates(e, entries);
  };
  onAddChild = e => {
    const {childComponents} = this.props;
    let entries = fromJS(childComponents);
    // make child component that you add have width of maxWidth / # of current columns + 1
    const newColumnWidth = columnWidthDescriptor.bounds[1] / 4;
    // add new column
    entries = entries.concat(
        JSON.parse(
            JSON.stringify(new ContainerItemClass({width: newColumnWidth})),
        ),
    );
    entries = this.balanceWidths(entries, entries.size - 1);

    this.setState({
      active: entries.size - 1,
      width: entries.getIn([entries.size - 1, 'width']),
    });
    this.updateColumnStates(e, entries);
  };

  onChange = e => {
    this.setState({width: e.target.value});
  };

  render() {
    const {childComponents, onChildrenChange} = this.props;
    const {active} = this.state;
    const stateOrComponentChildComponentsValue =
        this.state && 'stateChildComponents' in this.state
            ? this.state.stateChildComponents // already edited in sidebar
            : childComponents;                // taken from props
    const wasTakenFromProps = this.state && 'stateChildComponents' in
        this.state; // if true, need to map widths to percentages

    return (
        <FormFieldWrapper>
          <FormFieldCollapsibleInput>
            {stateOrComponentChildComponentsValue &&
            stateOrComponentChildComponentsValue.map((entry, i) => {
              // restricting to min and max widths
              // const boundedValue = entry.width
              //     ? entry.width
              //     : columnWidthDescriptor.bounds[0];

              return (
                  <div className={'entry-container'} key={i}>
                    <div
                        className={'entry-header'}
                        onClick={() =>
                            this.setState({active: active === i ? false : i})
                        }
                    >
                      <div className={'description'}>
                        <strong>{sizeDescriptions[i]}</strong>
                      </div>
                      <div className={'description'}>
                        {`${wasTakenFromProps ? entry.width : this.state.width}%`}
                      </div>
                      <button onClick={e => this.onRemoveChild(e, i)}>
                        <FontAwesomeIcon icon={['far', 'trash']}/>
                      </button>
                    </div>

                    <CollapsibleEntry
                        pose={i === active ? 'active' : 'inactive'}
                        className={'entry-wrapper'}
                    >
                      <div className={'row'}>
                        <div className={'width'}>
                          <form onSubmit={e => this.onEditChild(e,
                              this.state.width, i)}>
                            <FormFieldWidthText
                                className={'entry-content'}
                                label={'Width'}
                                name={'width'}
                                value={this.state.width}
                                onChange={e => this.onChange(e)}
                                type="text"
                                buttons={
                                  <React.Fragment>
                                    <button type="submit">
                                      <FontAwesomeIcon icon={['far', 'check']}/>
                                    </button>
                                  </React.Fragment>
                                }
                            />
                          </form>
                        </div>
                      </div>
                    </CollapsibleEntry>
                  </div>
              );
            })}
            {childComponents && childComponents.length < 4 && (
                <AddButtonWrapper>
                  <button onClick={this.onAddChild}>
                    <FontAwesomeIcon icon={['far', 'plus']} size={'1x'}/>
                  </button>
                </AddButtonWrapper>
            )}
          </FormFieldCollapsibleInput>
        </FormFieldWrapper>
    );
  }
}
