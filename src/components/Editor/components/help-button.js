import React from 'react';
import PropType from 'prop-types';
import {OutlinedBlock, Block, BlockLabel, StyledHelpButton} from '../styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export class HelpButton extends React.Component {
  static propTypes = {
    editorRef: PropType.object.isRequired,
    // children: PropType.node.isRequired,
    // size: PropType.number.isRequired,
  };

  render() {
    // const CustomHeaderTag = `h${this.props.size}`;
    // const {children, ...otherProps} = this.props;

    return (
        <StyledHelpButton>
          <FontAwesomeIcon icon={['fal', 'palette']}
                           transform={{ rotate: -45 }}
                           size={'2x'}
          />
        </StyledHelpButton>
    );
  }
}
