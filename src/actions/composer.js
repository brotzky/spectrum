import { track } from '../EventTracker';
import * as firebase from 'firebase';

/*------------------------------------------------------------\*
*

toggleComposer
Right now there isn't much state to manage on the composer, but we do store
an open/closed boolean in redux so that as a user navigates around, or refreshes the page,
we'll be able to persist the UI

*
\*------------------------------------------------------------*/
export const toggleComposer = () => {
  track('composer', 'toggled', null);

  return {
    type: 'TOGGLE_COMPOSER_OPEN',
  };
};

export const updateTitle = title => ({
  type: 'UPDATE_TITLE',
  title,
});

export const updateBody = body => ({
  type: 'UPDATE_BODY',
  body,
});

export const addMediaList = file => {
  track('composer', 'media uploaded', null);

  return {
    type: 'ADD_MEDIA_LIST',
    file,
  };
};

export const removeImageFromStory = (key, story) => dispatch => {
  return firebase
    .database()
    .ref(`stories/${story}/media/${key}`)
    .remove()
    .then(() => {
      track('composer', 'media removed', null);

      dispatch({
        type: 'REMOVE_MEDIA_LIST',
        key,
      });
    });
};
