import * as React from 'react';
import {oneOf, node} from 'prop-types';
import CoreText from 'wix-ui-core/Text';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

interface Props {
  /** skin color of the heading */
  skin?: 'dark' | 'light';

  /** typography of the heading */
  appearance?: 'H0' | 'H1' | 'H2' | 'H3';

  /** The text to show */
  children?: React.ReactNode;
}

interface State {
  tagName: string;
}

export default class Heading extends React.PureComponent<Props, State> {
  propTypes = {
    /** skin color of the heading */
    skin: oneOf(['dark', 'light']),

    /** typography of the heading */
    appearance: oneOf(['H0', 'H1', 'H2', 'H3']),

    /** The text to show */
    children: node
  };

  static defaultProps = {
    appearance: 'H0',
    skin: 'dark'
  };

  constructor(props) {
    super(props);
    this.state = {tagName: getType(props.appearance)};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.appearance !== nextProps.appearance) {
      this.setState({tagName: getType(nextProps.appearance)});
    }
  }

  render() {
    const {children, appearance, skin} = this.props;

    return (
      <ThemedComponent {...{theme, appearance, skin}}>
        <CoreText tagName={this.state.tagName}>
          {children}
        </CoreText>
      </ThemedComponent>
    );
  }
}

function getType(appearance) {
  return [
    {type: 'h1', candidates: ['H0']},
    {type: 'h2', candidates: ['H1']},
    {type: 'h3', candidates: ['H2']},
    {type: 'h4', candidates: ['H3']}
  ]
    .filter(({candidates}) => candidates.indexOf(appearance) !== -1)
    .reduceRight((acc, {type}) => type, 'span');
}
