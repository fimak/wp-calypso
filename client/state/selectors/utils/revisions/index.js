/**
 * External dependencies
 */
import { cloneDeep, get, identity } from 'lodash';

/**
 * Internal dependencies
 */
import decodeEntities from 'lib/post-normalizer/rule-decode-entities';

const runMaybe = ( input, fn ) =>
	get( fn( [ input ] ), 0, null );

const normalizeForFields = ( fields ) => ( revision ) =>
	runMaybe( revision, maybe => maybe
		.filter( Boolean )
		.map( cloneDeep )
		.map( ( post ) => decodeEntities( post, fields ) )
	);

const NORMALIZER_MAPPING = {
	display: normalizeForFields( [ 'content', 'excerpt', 'title', 'site_name' ] ),
	editing: normalizeForFields( [ 'excerpt', 'title', 'site_name' ] ),
};

const injectAuthor = ( state ) => ( revision ) => {
	const author = get( state.users.items, revision.author );
	return author
		? { ...revision, author }
		: revision;
};

export function hydrateRevision( state, revision ) {
	return runMaybe( revision, maybe => maybe
		.filter( Boolean )
		.map( injectAuthor( state ) )
	);
}

export function normalizeRevision( normalizerName, revision ) {
	return get( NORMALIZER_MAPPING, normalizerName, identity )( revision );
}
