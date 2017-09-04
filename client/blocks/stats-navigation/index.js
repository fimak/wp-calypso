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
import { navItems, intervals } from './constants';
import { getJetpackSites } from 'state/selectors';
import QueryJetpackPlugins from 'components/data/query-jetpack-plugins';
import config from 'config';

const StatsNavigation = props => {
	const { isJetpack, isStore, slug, selectedItem, interval, jetPackSites } = props;
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
	const { label, showIntervals, path } = navItems[ selectedItem ];
	const slugPath = `${ slug ? '/' : '' }${ slug || '' }`;
	return (
		<SectionNav className="stats-navigation" selectedText={ label }>
			{ isJetpack && <QueryJetpackPlugins siteIds={ jetPackSites.map( site => site.ID ) } /> }
			<NavTabs label={ 'Stats' } selectedText={ label }>
				{ Object.keys( navItems ).filter( isValidItem ).map( item => {
					const navItem = navItems[ item ];
					const defaultInterval = interval || 'day';
					const intervalPath = navItem.showIntervals ? `/${ defaultInterval }` : '';
					const itemPath = `${ navItem.path }${ intervalPath }${ slugPath }`;
					return (
						<NavItem key={ item } path={ itemPath } selected={ selectedItem === item }>
							{ navItem.label }
						</NavItem>
					);
				} ) }
			</NavTabs>
			{ showIntervals &&
				<Intervals
					selected={ interval }
					pathTemplate={ `${ path }/{{ interval }}${ slugPath }` }
				/> }
			<FollowersCount />
		</SectionNav>
	);
};

StatsNavigation.propTypes = {
	slug: PropTypes.string,
	selectedItem: PropTypes.oneOf( Object.keys( navItems ) ).isRequired,
	siteId: PropTypes.number,
	interval: PropTypes.oneOf( intervals.map( i => i.value ) ),
	isJetpack: PropTypes.bool,
	isStore: PropTypes.bool,
	jetPackSites: PropTypes.array,
};

export default connect( ( state, { siteId } ) => {
	const isJetpack = isJetpackSite( state, siteId );
	return {
		isJetpack,
		jetPackSites: getJetpackSites( state ),
		isStore: isJetpack && isPluginActive( state, siteId, 'woocommerce' ),
		siteId,
	};
} )( StatsNavigation );
