/**
 * Internal dependencies
 */
import { AUTOMATED_TRANSFER_INITIATE } from 'state/action-types';
import { dispatchRequest } from 'state/data-layer/wpcom-http/utils';
import { http } from 'state/data-layer/wpcom-http/actions';
import { updatePluginUploadProgress, pluginUploadError } from 'state/plugins/upload/actions';

export const initiateTransfer = ( { dispatch }, action ) => {
	const { siteId, pluginZip } = action;

	dispatch( http( {
		method: 'POST',
		path: `/sites/${ siteId }/automated-transfers/initiate`,
		apiVersion: '1',
		formData: [ [ 'plugin_zip', pluginZip ] ],
	}, action ) );
};

export const receiveError = ( { dispatch }, { siteId }, next, error ) => {
	dispatch( pluginUploadError( siteId, error ) );
};

export const updateUploadProgress = ( { dispatch }, { siteId }, next, { loaded, total } ) => {
	const progress = total ? ( loaded / total ) * 100 : total;
	dispatch( updatePluginUploadProgress( siteId, progress ) );
};

export default {
	[ AUTOMATED_TRANSFER_INITIATE ]: [ dispatchRequest(
		initiateTransfer,
		null,
		receiveError,
		updateUploadProgress
	) ]
};
