import React from 'react';
import PropType from 'prop-types';
import posed from 'react-pose';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {OutlinedBlock, Block, BlockLabel, StyledHelpButton} from '../styles';
import {Log} from '../../../_helpers';

/*
 H1              meta+1         node
 H2              meta+2         node
 H3              meta+3         node
 Line Separator  meta+H         node TODO
 Bold            meta+B         mark
 Italic          meta+I         mark
 Underline       meta+U         mark
 Strikethrough   meta+shift+S   mark
 Link            meta+K         mark
 List            meta+L         node
 Ordered List    meta+shift+L   node
 Quote           meta+shift+U   node
 Checklist/Todo  meta+alt+shift+l         node
 Code            meta+shift+C   mark
 Code Block      meta+shift+D   node
 Mark            meta+M         mark
 File?           meta+shift+F   -
 Save            meta+S         -
 */

const q = ({children}) => <span className='symbols'>{children}</span>;
const makeKeyList = (metaKey) => (
    [
      {
        icon: 'heading-one',
        text: <span><q>#</q> Heading 1</span>,
        key: `${metaKey}1`,
      },
      {
        icon: 'heading-two',
        text: <span><q>##</q> Heading 2</span>,
        key: `${metaKey}2`,
      },
      {
        icon: 'heading-three',
        text: <span><q>###</q> Heading 3</span>,
        key: `${metaKey}3`,
      },

      {
        icon: 'bold',
        text: <span><q>*</q>Bold<q>*</q></span>,
        key: `${metaKey}B`,
      },
      {
        icon: 'italic',
        text: <span><q>/</q>Italic<q>/</q></span>,
        key: `${metaKey}I`,
      },
      {
        icon: 'underline',
        text: <span><q>_</q>Underline<q>_</q></span>,
        key: `${metaKey}U`,
      },
      {
        icon: 'strikethrough',
        text: <span><q>-</q>Strike<q>-</q></span>,
        key: `⇧${metaKey}S`,
      },
      {
        icon: 'code',
        text: <span><q>`</q>Code<q>`</q></span>,
        key: `⇧${metaKey}C`,
      },

      {
        icon: 'unordered-list',
        text: <span><q>*</q> Unordered List</span>,
        key: `${metaKey}L`,
      },
      {
        icon: 'ordered-list',
        text: <span><q>1.</q> Ordered List</span>,
        key: `⇧${metaKey}L`,
      },
      // {icon: 'ordered-list', text: <span><q>1.</q> Ordered List</span>, key: `⇧${metaKey}L`},
      {
        icon: 'block-quote',
        text: <span><q>></q> Quote List</span>,
        key: `⇧${metaKey}U`,
      },
      {
        icon: 'block-code',
        text: <span><q>```</q>Block Code<q>```</q></span>,
        key: `⇧${metaKey}L`,
      },
    ]
);

export class HelpButton extends React.Component {
  static propTypes = {
    editorRef: PropType.object.isRequired,
    // children: PropType.node.isRequired,
    // size: PropType.number.isRequired,
  };

  componentDidMount() {
    // Get meta key code
    this.metaKey = process.platform === 'darwin' ? '⌘' : '⌃';
  }

  state = {
    isOpen: false,
  };

  onClick = (e) => {
    this.setState({isOpen: !this.state.isOpen});
    e.preventDefault();
  };

  render() {
    const {isOpen} = this.state;
    Log.info(`modal is open: ${this.state.isOpen}`, 'help button');

    return (
        <React.Fragment>
          <StyledHelpButton onClick={this.onClick} isOpen={isOpen}>
            <FontAwesomeIcon icon={['fal', 'question-circle']}
                // transform={{ rotate: -45 }}
                             size={'1x'}
            />
          </StyledHelpButton>
          <HelpModal pose={isOpen ? 'visible' : 'hidden'}>
            {makeKeyList(this.metaKey).map((item, i) => {
              const {icon, text, key} = item;
              return (
                  <HelpModalItem key={i}>
                    <div className={'icon'}>
                      <FontAwesomeIcon icon={icon}/>
                    </div>
                    <div className={'text'}>{text}</div>
                    <div className={'key'}>{key}</div>
                  </HelpModalItem>
              );
            })}
          </HelpModal>
        </React.Fragment>
    );
  }
}

const HelpModal = styled(posed.div({
  visible: {
    opacity: 1,
    y: -10,
    scale: 1,
    originX: '50%',
    originY: '100%',
    transition: {
      opacity: {ease: 'easeIn', duration: 200},
      default: {ease: 'easeIn', duration: 180},
    },
  },
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0,
    originX: '50%',
    originY: '100%',
    transition: {
      opacity: {ease: 'easeIn', duration: 200},
      default: {ease: 'easeOut', duration: 180},
    },
  },
}))`
  position: fixed;
  bottom: 200px;
  right: 50px;
  background-color: blue;
  height: 300px;
  width: 100px;
`;

const HelpModalItem = styled(posed.div({
  enter: {
    x: 20,
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}))`
  display: flex;
  .icon {

  }
  .text {

  }
  .key {

  }
`;
