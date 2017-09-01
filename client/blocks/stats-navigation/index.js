/** @format */
/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import SectionNav from 'components/section-nav';
import NavItem from 'components/section-nav/item';
import NavTabs from 'components/section-nav/tabs';
import Intervals from './intervals';
import FollowersCount from 'blocks/followers-count';
import { isPluginActive } from 'state/selectors';
import { isJetpackSite } from 'state/sites/selectors';
import { navItems } from './constants';
import config from 'config';

const StatsNavigation = props => {
	const { isJetpack, isStore, slug, selectedItem, interval } = props;
	function isValidItem( item ) {
		switch ( item ) {
			case 'activity':
				return config.isEnabled( 'jetpack/activity-log' ) && isJetpack;
			case 'store':
				return isStore;
			default:
				return true;
		}
	}
	const selectedText = navItems[ selectedItem ].label;
	return (
		<SectionNav className="stats-navigation" selectedText={ selectedText }>
			<NavTabs label={ 'Stats' } selectedText={ selectedText }>
				{ Object.keys( navItems ).filter( isValidItem ).map( item => {
					const navItem = navItems[ item ];
					const intervalPath = navItem.interval ? `/${ interval }` : '';
					const slugPath = `${ slug ? '/' : '' }${ slug || '' }`;
					const path = `${ navItem.path }${ intervalPath }${ slugPath }`;
					return (
						<NavItem key={ item } path={ path } selected={ selectedItem === item }>
							{ navItem.label }
						</NavItem>
					);
				} ) }
			</NavTabs>
			<Intervals selected={ interval } />
			<FollowersCount />
		</SectionNav>
	);
};

StatsNavigation.propTypes = {
	slug: PropTypes.string,
};

export default connect( ( state, { siteId } ) => {
	const isJetpack = isJetpackSite( state, siteId );
	return {
		isJetpack,
		isStore: isJetpack && isPluginActive( state, siteId, 'woocommerce' ),
		siteId,
	};
} )( StatsNavigation );
