/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { intervals } from './constants';
import SegmentedControl from 'components/segmented-control';
import ControlItem from 'components/segmented-control/item';

const Intervals = props => {
	const { selected } = props;
	return (
		<SegmentedControl>
			{ intervals.map( i =>
				<ControlItem key={ i.value } path={ '/hello-world' } selected={ i.value === selected }>
					{ i.label }
				</ControlItem>
			) }
		</SegmentedControl>
	);
};

Intervals.propTypes = {
	selected: PropTypes.string.isRequired,
};

export default Intervals;
