/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';

export const intervals = [
	{ value: 'day', label: translate( 'Days' ) },
	{ value: 'week', label: translate( 'Weeks' ) },
	{ value: 'month', label: translate( 'Months' ) },
	{ value: 'year', label: translate( 'Years' ) },
];

export const navItems = {
	traffic: { label: translate( 'Traffic' ), path: '/stats', intervals: true },
	insights: { label: translate( 'Insights' ), path: '/stats/insights', intervals: false },
	activity: { label: translate( 'Activity' ), path: '/stats/activity', intervals: false },
	store: { label: translate( 'Store' ), path: '/store/stats/orders', intervals: true },
};
